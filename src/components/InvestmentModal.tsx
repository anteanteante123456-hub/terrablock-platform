"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Loader2, Info, Wallet } from "lucide-react";
import { useAccount, useConnect } from "wagmi";
import { Property } from "@/types/property";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface InvestmentModalProps {
  property: Property;
  onClose: () => void;
}

export default function InvestmentModal({ property, onClose }: InvestmentModalProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [amount, setAmount] = useState(property.financials.minimumInvestment);
  const [tokens, setTokens] = useState(Math.floor(amount / property.financials.tokenPrice));
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStep, setTransactionStep] = useState<"input" | "confirm" | "processing" | "success" | "error">("input");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    const newTokens = Math.floor(amount / property.financials.tokenPrice);
    setTokens(newTokens);
  }, [amount, property.financials.tokenPrice]);

  const handleAmountChange = (value: number) => {
    const clampedValue = Math.min(
      Math.max(value, property.financials.minimumInvestment),
      property.financials.availableTokens * property.financials.tokenPrice
    );
    setAmount(clampedValue);
  };

  const estimatedYearlyReturn = (amount * property.financials.estimatedYield) / 100;
  const transactionFee = 0.05;

  const handleInvest = async () => {
    if (!isConnected) {
      const connector = connectors[0];
      if (connector) {
        await connect({ connector });
      }
      return;
    }

    setTransactionStep("confirm");
  };

  const confirmInvestment = async () => {
    setTransactionStep("processing");
    setIsProcessing(true);

    setTimeout(() => {
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      setTxHash(mockTxHash);
      setTransactionStep("success");
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="glass rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold">Invest in {property.name}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-navy-light hover:bg-card-hover transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {transactionStep === "input" && (
            <>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Investment Amount (EUR)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    min={property.financials.minimumInvestment}
                    max={property.financials.availableTokens * property.financials.tokenPrice}
                    step={100}
                    className="w-full px-4 py-3 bg-navy-light rounded-lg text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">EUR</span>
                </div>
                
                <input
                  type="range"
                  value={amount}
                  onChange={(e) => handleAmountChange(Number(e.target.value))}
                  min={property.financials.minimumInvestment}
                  max={Math.min(property.financials.availableTokens * property.financials.tokenPrice, 100000)}
                  step={100}
                  className="w-full mt-4"
                />
                
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>Min: {formatCurrency(property.financials.minimumInvestment)}</span>
                  <span>Max: {formatCurrency(property.financials.availableTokens * property.financials.tokenPrice)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tokens to Receive</span>
                  <span className="font-semibold">{tokens.toLocaleString()} tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Price</span>
                  <span>{formatCurrency(property.financials.tokenPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Annual Return</span>
                  <span className="text-success font-semibold">{formatCurrency(estimatedYearlyReturn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Yield</span>
                  <span className="text-success">{formatPercentage(property.financials.estimatedYield)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Transaction Fee</span>
                  <span>{formatCurrency(transactionFee)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(amount + transactionFee)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-3 mb-6">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    By investing, you agree to our terms and conditions. Your investment will be locked 
                    until the funding period ends. Dividends are paid quarterly.
                  </div>
                </div>
              </div>

              {!isConnected ? (
                <button
                  onClick={handleInvest}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet to Invest
                </button>
              ) : (
                <button
                  onClick={handleInvest}
                  className="w-full btn-primary"
                >
                  Continue to Confirmation
                </button>
              )}
            </>
          )}

          {transactionStep === "confirm" && (
            <>
              <div className="bg-navy-light rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">Investment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Property</span>
                    <span>{property.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Investment Amount</span>
                    <span>{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tokens</span>
                    <span>{tokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network</span>
                    <span>{property.blockchain.network}</span>
                  </div>
                </div>
              </div>

              <div className="bg-warning/10 rounded-lg p-3 mb-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    Please confirm this transaction in your wallet. The transaction will be processed 
                    on {property.blockchain.network} network.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setTransactionStep("input")}
                  className="flex-1 btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={confirmInvestment}
                  className="flex-1 btn-primary"
                >
                  Confirm Investment
                </button>
              </div>
            </>
          )}

          {transactionStep === "processing" && (
            <div className="text-center py-8">
              <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
              <h3 className="font-heading text-xl font-semibold mb-2">Processing Investment</h3>
              <p className="text-gray-400">Please wait while we process your transaction...</p>
              <div className="mt-6 p-3 bg-navy-light rounded-lg">
                <div className="text-sm text-gray-400">
                  This may take a few moments. Do not close this window.
                </div>
              </div>
            </div>
          )}

          {transactionStep === "success" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Investment Successful!</h3>
              <p className="text-gray-400 mb-6">
                You have successfully invested {formatCurrency(amount)} in {property.name}
              </p>
              
              <div className="bg-navy-light rounded-lg p-4 mb-6 text-left">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction Hash</span>
                    <span className="font-mono text-xs">{txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tokens Received</span>
                    <span>{tokens.toLocaleString()} {property.blockchain.tokenSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Annual Return</span>
                    <span className="text-success">{formatCurrency(estimatedYearlyReturn)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={() => window.open(`https://polygonscan.com/tx/${txHash}`, "_blank")}
                  className="flex-1 btn-primary"
                >
                  View Transaction
                </button>
              </div>
            </div>
          )}

          {transactionStep === "error" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Transaction Failed</h3>
              <p className="text-gray-400 mb-6">
                There was an error processing your investment. Please try again.
              </p>
              <button
                onClick={() => setTransactionStep("input")}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}