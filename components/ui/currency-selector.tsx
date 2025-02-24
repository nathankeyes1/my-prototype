"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export type Currency = {
  code: string
  name: string
  symbol: string
  flag: string
  aliases?: string[]
}

const CURRENCIES: Currency[] = [
  { 
    code: 'USD', 
    name: 'US Dollar', 
    symbol: '$', 
    flag: '🇺🇸',
    aliases: ['dollar', 'usd', 'american dollar']
  },
  { 
    code: 'MXN', 
    name: 'Mexican Peso', 
    symbol: '$', 
    flag: '🇲🇽',
    aliases: ['peso', 'mxn', 'mexican']
  },
  { 
    code: 'INR', 
    name: 'Indian Rupee', 
    symbol: '₹', 
    flag: '🇮🇳'
  },
  { 
    code: 'PHP', 
    name: 'Philippine Peso', 
    symbol: '₱', 
    flag: '🇵🇭'
  },
  { 
    code: 'CNY', 
    name: 'Chinese Yuan', 
    symbol: '¥', 
    flag: '🇨🇳',
    aliases: ['rmb', 'yuan', 'renminbi']
  },
  { 
    code: 'VND', 
    name: 'Vietnamese Dong', 
    symbol: '₫', 
    flag: '🇻🇳'
  },
  { 
    code: 'PKR', 
    name: 'Pakistani Rupee', 
    symbol: '₨', 
    flag: '🇵🇰'
  },
  { 
    code: 'BDT', 
    name: 'Bangladeshi Taka', 
    symbol: '৳', 
    flag: '🇧🇩'
  },
  { 
    code: 'NGN', 
    name: 'Nigerian Naira', 
    symbol: '₦', 
    flag: '🇳🇬'
  },
  { 
    code: 'EGP', 
    name: 'Egyptian Pound', 
    symbol: 'E£', 
    flag: '🇪🇬'
  },
  { 
    code: 'GBP', 
    name: 'British Pound', 
    symbol: '£', 
    flag: '🇬🇧'
  },
  { 
    code: 'EUR', 
    name: 'Euro', 
    symbol: '€', 
    flag: '🇪🇺'
  },
  { 
    code: 'CAD', 
    name: 'Canadian Dollar', 
    symbol: '$', 
    flag: '🇨🇦'
  },
  { 
    code: 'AUD', 
    name: 'Australian Dollar', 
    symbol: '$', 
    flag: '🇦🇺'
  },
  { 
    code: 'BRL', 
    name: 'Brazilian Real', 
    symbol: 'R$', 
    flag: '🇧🇷'
  },
  { 
    code: 'IDR', 
    name: 'Indonesian Rupiah', 
    symbol: 'Rp', 
    flag: '🇮🇩'
  },
  { 
    code: 'LKR', 
    name: 'Sri Lankan Rupee', 
    symbol: 'Rs', 
    flag: '🇱🇰'
  },
  { 
    code: 'NPR', 
    name: 'Nepalese Rupee', 
    symbol: 'रू', 
    flag: '🇳🇵'
  },
  { 
    code: 'KRW', 
    name: 'South Korean Won', 
    symbol: '₩', 
    flag: '🇰🇷'
  },
  { 
    code: 'THB', 
    name: 'Thai Baht', 
    symbol: '฿', 
    flag: '🇹🇭'
  }
]

interface CurrencySelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (currency: Currency) => void
  selected: Currency
}

export function CurrencySelector({ isOpen, onClose, onSelect, selected }: CurrencySelectorProps) {
  const [search, setSearch] = React.useState("")
  
  const filteredCurrencies = CURRENCIES.filter(currency => {
    const searchTerm = search.toLowerCase()
    return (
      currency.code.toLowerCase().includes(searchTerm) ||
      currency.name.toLowerCase().includes(searchTerm) ||
      currency.aliases?.some(alias => alias.toLowerCase().includes(searchTerm))
    )
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col max-h-screen sm:max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Select Currency</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search currencies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="grid gap-1">
              {filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    onSelect(currency)
                    onClose()
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 w-full text-left rounded-md",
                    "hover:bg-muted active:bg-muted/70 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected.code === currency.code && "bg-muted"
                  )}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 shrink-0">
                    {currency.flag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{currency.code}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {currency.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 