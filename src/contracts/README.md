# Smart Contracts Directory

## Structure
```
src/contracts/
├── abis/              # Contract ABIs (JSON files)
├── addresses/         # Contract addresses per network
├── solidity/          # Solidity source code (.sol files)
└── hooks/             # React hooks for contract interaction
```

## For Blockchain Developer

### 1. Smart Contract Files
Place your smart contracts here:
- `solidity/PropertyToken.sol` - ERC-3643 token contract
- `solidity/TokenFactory.sol` - Factory for creating property tokens
- `solidity/Marketplace.sol` - Secondary market trading
- `solidity/Governance.sol` - DAO governance contracts

### 2. After Deployment
Add deployed contract info:
```javascript
// addresses/mainnet.ts
export const contracts = {
  propertyToken: "0x...",
  tokenFactory: "0x...",
  marketplace: "0x...",
  governance: "0x..."
}
```

### 3. Contract ABIs
```javascript
// abis/PropertyToken.json
{
  "abi": [...],
  "bytecode": "0x..."
}
```

### 4. Integration Hooks
```javascript
// hooks/usePropertyToken.ts
import { useContract } from 'wagmi'
import PropertyTokenABI from '../abis/PropertyToken.json'

export function usePropertyToken() {
  // Contract interaction logic
}
```

## Development Workflow

1. Create feature branch:
```bash
git checkout -b feature/smart-contracts
```

2. Add your contracts and code

3. Test locally:
```bash
npm run dev
```

4. Push changes:
```bash
git add .
git commit -m "Add smart contracts"
git push origin feature/smart-contracts
```

5. Create Pull Request on GitHub

6. After review, merge to master (auto-deploys to production)

## Environment Variables Needed

Add to `.env.local`:
```
NEXT_PUBLIC_ALCHEMY_KEY=your-alchemy-key
NEXT_PUBLIC_INFURA_KEY=your-infura-key
NEXT_PUBLIC_CONTRACT_ADDRESS_PROPERTY_TOKEN=0x...
NEXT_PUBLIC_CONTRACT_ADDRESS_MARKETPLACE=0x...
NEXT_PUBLIC_CHAIN_ID=1
```

## Testing Networks
- Local: Hardhat/Ganache (localhost:8545)
- Testnet: Sepolia/Goerli
- Mainnet: Ethereum Mainnet

## Contact
For questions about integration, contact the frontend team.