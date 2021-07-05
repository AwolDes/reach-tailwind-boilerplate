# reach-tailwind-boilerplate
Reach + React &amp; Tailwind for building dApps with Algorand!

# What is this?
This is a really simple boilerplate repo that has the following:
- Connect to AlgoSigner by default (require chrome)
- An auth provider that uses an account instead of typical auth (like JWT)
- Use a testnet faucet (visit `/faucet`)
- React & Tailwind CSS
- Some helper features like a maintenance page, error boundary, and an under developement component
- Implemntation of Rock, paper, scissors from the Reach tutorial

# How to Run

`yarn start`
# Algo Signer devnet
https://docs.reach.sh/guide-browser-testing.html#%28part._.Algorand%29

The configuration for a new network:
- Display Name: Reach Devnet
- Network ID: devnet-v1
- Network Algod URL: http://localhost:4180
- Network Indexer URL: http://localhost:8980
- Network Headers: `{"Algod": {"X-Algo-API-Token": "c87f5580d7a866317b4bfe9e8b8d1dda955636ccebfa88c12b414db208dd9705"}, "Indexer": {"X-Indexer-API-Token": "reach-devnet"}}`
# Algo Faucet

Get Algos at `/faucet`