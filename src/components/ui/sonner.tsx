"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "white",
          "--normal-border": "var(--input)",
          "--success-bg": "var(--card)",
          "--success-text": "white",
          "--success-border": "var(--input)",
          "--error-bg": "var(--card)",
          "--error-text": "white",
          "--error-border": "var(--input)",
          "--warning-bg": "var(--card)",
          "--warning-text": "white",
          "--warning-border": "var(--input)",
          "--info-bg": "var(--card)",
          "--info-text": "white",
          "--info-border": "var(--input)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
