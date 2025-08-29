import { PageProps as InertiaPageProps } from "@inertiajs/core"

export type FlashMessage = {
  toast?: {
    type: "success" | "error" | "info" | "warning"
    message: string
  }
}

declare module "@inertiajs/core" {
  export interface PageProps extends InertiaPageProps {
    flash: FlashMessage
  }
}
