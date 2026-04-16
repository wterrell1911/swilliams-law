"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { mainNavigation, isDropdown, type NavEntry, type NavDropdown } from "@/config/navigation"
import { cn } from "@/lib/utils"

interface NavigationMenuProps {
  mobile?: boolean
  onItemClick?: () => void
}

function DropdownMenu({ item, onItemClick }: { item: NavDropdown; onItemClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
          "text-warmWhite/90 hover:text-gold-500 hover:bg-navy-800"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.name}
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[600px] bg-navy-900 border border-navy-700 rounded-xl shadow-xl shadow-black/30 p-6 z-50">
          <div className="grid grid-cols-3 gap-6">
            {item.items.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-500 mb-3">
                  {section.title}
                </h4>
                <div className="space-y-2">
                  {section.items.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      onClick={onItemClick}
                      className="block p-3 rounded-lg hover:bg-navy-800 transition-colors group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-warmWhite group-hover:text-gold-500 transition-colors">
                          {subItem.name}
                        </span>
                        {subItem.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-gold-500 text-navy-950 rounded">
                            {subItem.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-warmWhite/60 mb-1">{subItem.description}</p>
                      {subItem.price && (
                        <span className="text-xs font-semibold text-gold-500">{subItem.price}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-navy-700">
            <Link
              href="/pricing"
              onClick={onItemClick}
              className="text-sm text-warmWhite/70 hover:text-gold-500 transition-colors flex items-center gap-1"
            >
              See all pricing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function MobileDropdown({ item, onItemClick }: { item: NavDropdown; onItemClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2 text-base font-medium rounded-md transition-colors",
          "text-warmWhite/90 hover:text-gold-500 hover:bg-navy-800"
        )}
      >
        {item.name}
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 ml-4 space-y-4">
          {item.items.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-500 mb-2 px-4">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    onClick={onItemClick}
                    className="block px-4 py-2 rounded-md hover:bg-navy-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-warmWhite">{subItem.name}</span>
                      {subItem.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-gold-500 text-navy-950 rounded">
                          {subItem.badge}
                        </span>
                      )}
                    </div>
                    {subItem.price && (
                      <span className="text-xs text-gold-500">{subItem.price}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function NavigationMenu({ mobile = false, onItemClick }: NavigationMenuProps) {
  const pathname = usePathname()

  if (mobile) {
    return (
      <>
        {mainNavigation.map((entry) => {
          if (isDropdown(entry)) {
            return <MobileDropdown key={entry.name} item={entry} onItemClick={onItemClick} />
          }
          const isActive = pathname === entry.href
          return (
            <Link
              key={entry.href}
              href={entry.href}
              onClick={onItemClick}
              className={cn(
                "block px-4 py-2 text-base font-medium rounded-md transition-colors",
                isActive
                  ? "bg-navy-800 text-gold-500"
                  : "text-warmWhite/90 hover:text-gold-500 hover:bg-navy-800"
              )}
            >
              {entry.name}
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <nav className="flex items-center space-x-1">
      {mainNavigation.map((entry) => {
        if (isDropdown(entry)) {
          return <DropdownMenu key={entry.name} item={entry} onItemClick={onItemClick} />
        }
        const isActive = pathname === entry.href
        return (
          <Link
            key={entry.href}
            href={entry.href}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
              isActive
                ? "text-gold-500"
                : "text-warmWhite/90 hover:text-gold-500 hover:bg-navy-800"
            )}
          >
            {entry.name}
          </Link>
        )
      })}
    </nav>
  )
}
