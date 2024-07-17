import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  const goToHome = () => {
    router.push('/')
  }

  const goToProfile = () => {
    router.push('/profile')
  }

  const goToLogin = () => {
    router.push('/login')
  }

  const goToRegister = () => {
    router.push('/register')
  }

  const goToUserDirectory = () => {
    router.push('/user-directory')
  }

  const goToUpdate = (id: number) => {
    router.push(`/user-update/${id}`)
  }

  const goToAdd = () => {
    router.push('/user-add')
  }

  return {
    goToHome,
    goToProfile,
    goToLogin,
    goToRegister,
    goToUserDirectory,
    goToUpdate,
    goToAdd
  }
}
