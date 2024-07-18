export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return '密碼長度需大於 8'
  }
  return null
}

export function validatePhoneNumber(phonenum: string): string | null {
  const phonePattern = /^09\d{8}$/
  if (!phonePattern.test(phonenum)) {
    return '手機號碼須為09開頭，且十位數'
  }
  return null
}

export function validateAccount(account: string): string | null {
  const accountPattern = /^[a-zA-Z0-9]{8}$/
  if (!accountPattern.test(account)) {
    return '帳號必須為8位數，且僅由英文和數字組成'
  }
  return null
}
