import { useEffect } from "react"
import { usePage } from "@inertiajs/react"
import { toast } from "sonner"

export function useFlashToast() {
  const { flash } = usePage().props

  useEffect(() => {
    if (flash?.toast) {
      toast[flash.toast.type](flash.toast.message, {
        duration: 5000,
        dismissible: true,
      })
    }
  }, [flash])
}
