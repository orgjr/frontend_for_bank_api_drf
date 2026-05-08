export function formatAccounts(value) {
  const formattedValue = String(value);
  const formattedAccount =
    formattedValue.slice(0, -1) + '-' + formattedValue.slice(-1);
  return formattedAccount;
}
