# TerraBlock Developer Guide

## Quick Start for Blockchain Developer

### 1. Get Access
Ask Felix to add you as collaborator on GitHub:
- Repository: https://github.com/anteanteante123456-hub/terrablock-platform
- You'll receive an email invitation

### 2. Setup Local Environment
```bash
# Clone repository
git clone https://github.com/anteanteante123456-hub/terrablock-platform.git
cd terrablock-platform

# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### 3. Project Structure
```
terrablock-platform/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── contracts/        # 🔥 BLOCKCHAIN CODE GOES HERE
│   │   ├── abis/        # Contract ABIs
│   │   ├── addresses/   # Deployed addresses
│   │   ├── solidity/    # Smart contract source
│   │   └── hooks/       # Web3 integration
│   ├── lib/             # Utilities
│   └── providers/       # Web3 providers
└── public/              # Static assets
```

## Blockchain Integration Points

### 1. Smart Contracts (`src/contracts/solidity/`)
Add your Solidity contracts:
- `PropertyToken.sol` - ERC-3643 compliant token
- `Marketplace.sol` - Trading functionality
- `Governance.sol` - DAO voting

### 2. Contract Integration (`src/contracts/hooks/`)
Create React hooks for contract interaction:
```typescript
// Example: usePropertyToken.ts
import { useContractRead, useContractWrite } from 'wagmi'

export function usePropertyToken() {
  const { data: balance } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: PropertyTokenABI,
    functionName: 'balanceOf',
  })

  const { write: transfer } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: PropertyTokenABI,
    functionName: 'transfer',
  })

  return { balance, transfer }
}
```

### 3. Update Components
Integrate blockchain data into existing components:
- `src/app/properties/[id]/page.tsx` - Show on-chain property data
- `src/app/trade/[pair]/page.tsx` - Connect to DEX
- `src/app/portfolio/page.tsx` - Display token balances

## Key Files to Modify

### For Property Tokenization:
```typescript
// src/app/properties/[id]/page.tsx
// Add "Tokenize" button that calls your smart contract

// src/components/PropertyCard.tsx
// Display on-chain status (tokenized/available)

// src/app/investors/page.tsx
// Show real token investment options
```

### For Trading:
```typescript
// src/app/trade/[pair]/page.tsx
// Connect to your marketplace contract

// src/components/TradingChart.tsx
// Display real price data from blockchain
```

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/smart-contracts
```

### 2. Make Changes
- Add contracts to `src/contracts/`
- Update components to use contracts
- Test thoroughly

### 3. Commit and Push
```bash
git add .
git commit -m "Add PropertyToken smart contract"
git push origin feature/smart-contracts
```

### 4. Create Pull Request
- Go to GitHub
- Create PR from your branch to `master`
- Add description of changes

### 5. Automatic Deployment
- Once merged to `master`, changes auto-deploy to production
- Check live site at: https://terrablock.se

## Environment Variables

Add these to `.env.local` for blockchain features:
```env
# Web3Modal Project ID
NEXT_PUBLIC_WEB3MODAL_PROJECT_ID=your-project-id

# RPC URLs
NEXT_PUBLIC_ALCHEMY_KEY=your-alchemy-key
NEXT_PUBLIC_INFURA_KEY=your-infura-key

# Contract Addresses (after deployment)
NEXT_PUBLIC_PROPERTY_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x...

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=1  # 1 for mainnet, 11155111 for sepolia
NEXT_PUBLIC_NETWORK_NAME=mainnet
```

## Testing

### Local Blockchain Testing
```bash
# Run local blockchain (in separate terminal)
npx hardhat node

# Deploy contracts locally
npx hardhat run scripts/deploy.js --network localhost

# Update .env.local with local addresses
```

### Frontend Testing
```bash
# Run tests
npm test

# Build for production
npm run build

# Check for errors
npm run lint
```

## Important Files

### Already Set Up:
- ✅ Web3Modal provider (`src/providers/WagmiProvider.tsx`)
- ✅ Wallet connection UI (`src/components/Navigation.tsx`)
- ✅ Property data structure (`src/types/property.ts`)
- ✅ Mock properties (`src/data/mockProperties.ts`)

### Needs Blockchain Integration:
- ⏳ Investment modal (`src/components/InvestmentModal.tsx`)
- ⏳ Trading functionality (`src/app/trade/`)
- ⏳ Portfolio display (`src/app/portfolio/`)
- ⏳ Property tokenization (`src/app/properties/`)

## Security Notes

1. **Never commit private keys or mnemonics**
2. **Use environment variables for sensitive data**
3. **All PRs should be reviewed before merging**
4. **Test on testnet before mainnet deployment**

## Communication

- **GitHub Issues**: For bugs and features
- **Pull Requests**: For code reviews
- **Direct Contact**: Reach out to Felix for urgent matters

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Wagmi Docs](https://wagmi.sh)
- [Viem Docs](https://viem.sh)
- [RainbowKit Docs](https://www.rainbowkit.com/docs)
- [ERC-3643 Standard](https://erc3643.org/)

## Questions?

If you need help:
1. Check this guide
2. Look at existing code examples
3. Create a GitHub issue
4. Contact the team

Happy coding! 🚀