const MeowcoinRPC = require("./dist/index.cjs");

test("3rd party service getblockcount", async () => {
  const rpc = MeowcoinRPC.getRPC(
    "anon",
    "anon",
    "https://mewc-rpc-mainnet.mewccrypto.com/rpc"
  );
  let count = 0;
  try {
    count = await rpc("getblockcount", []);
  } catch (e) {}

  const countMoreThanZero = count > 0;
  expect(countMoreThanZero).toBe(true);
});

test("3rd party service incorrect method", async () => {
  const rpc = MeowcoinRPC.getRPC(
    "anon",
    "anon",
    "https://mewc-rpc-mainnet.mewccrypto.com/rpc"
  );
  const method = "getblockcountWRONG";
  const params = [];

  let theError = null;
  try {
    const count = await rpc(method, params);
  } catch (e) {
    theError = e;
  }

  expect(!!theError).toBe(true);
  expect(theError.error).toBe("Not in whitelist");
  expect(theError.description).toBe(
    "Method getblockcountWRONG is not supported"
  );
});

test("Non existing 3rd party service getblockcount", async () => {
  const rpc = MeowcoinRPC.getRPC(
    "anon",
    "anon",
    "https://tls-rpc-mainnet.WRONG.ting.finance/rpc"
  );

  let error = null;
  try {
    const count = await rpc("getblockcount", []);
  } catch (e) {
    error = e;
  }

  expect(!!error).toBe(true);
});
