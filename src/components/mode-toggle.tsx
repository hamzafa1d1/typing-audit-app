"use client"

import * as React from "react"
import { ChevronDown, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const OPTIONS = [
  {
    value: "light" as const,
    label: "Light",
    hint: "Always use light appearance",
    Icon: Sun,
  },
  {
    value: "dark" as const,
    label: "Dark",
    hint: "Always use dark appearance",
    Icon: Moon,
  },
  {
    value: "system" as const,
    label: "System",
    hint: "Match your device setting",
    Icon: Monitor,
  },
]

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const preference = (theme ?? "system") as "light" | "dark" | "system"
  const activeOption = OPTIONS.find((o) => o.value === preference) ?? OPTIONS[2]
  const TriggerIcon = activeOption.Icon

  const triggerTitle = !mounted
    ? "Theme"
    : preference === "system"
      ? `Theme: System (${resolvedTheme === "dark" ? "dark" : "light"} now)`
      : `Theme: ${preference === "light" ? "Light" : "Dark"}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        title={triggerTitle}
        aria-label={triggerTitle}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-10 gap-1.5 rounded-full px-3 shadow-sm",
          "aria-expanded:bg-muted aria-expanded:text-foreground"
        )}
      >
        {!mounted ? (
          <Sun
            className="size-[1.15rem] shrink-0 text-muted-foreground opacity-50"
            aria-hidden
          />
        ) : (
          <TriggerIcon className="size-[1.15rem] shrink-0" aria-hidden />
        )}
        <ChevronDown
          className="size-3.5 shrink-0 opacity-60"
          aria-hidden
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={preference}
            onValueChange={(value) => {
              if (
                value === "light" ||
                value === "dark" ||
                value === "system"
              ) {
                setTheme(value)
              }
            }}
          >
            {OPTIONS.map(({ value, label, hint, Icon }) => (
              <DropdownMenuRadioItem
                key={value}
                value={value}
                closeOnClick
                label={label}
                className="group items-start gap-3 py-2 pl-2 pr-8"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground group-data-checked:text-foreground" />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-medium leading-none">{label}</span>
                  <span className="text-xs font-normal leading-snug text-muted-foreground">
                    {hint}
                  </span>
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
