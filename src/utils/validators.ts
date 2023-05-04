export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

export const fieldIsEmpty = (value: string | string[]) => value === '' || value.length === 0
