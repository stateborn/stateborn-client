Here is the list of all validation done by the client. It includes various IPFS document data validation and results returned by stateborn backend.

# Proposal validation
After 1st proposal fetch from backend, it is saved to IndexedDB.
Validation process is done:
- verify IPFS document data matches data returned by backend
- verify proposal author signature

# Vote validation
Votes are saved to IndexedDB before sending to backend.
When vote are read from backend, validation process is done:
- verify IPFS document data matches data returned by backend
- verify IPFS document data matches vote locally saved. This is verified only if locally saved vote is available (was not removed e.g. after browser cache cleanup)
- verify local vote (or IPFS document data if not available) author signature
