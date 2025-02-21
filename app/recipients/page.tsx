"use client"

import { useState } from "react"
import { Search, Plus, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Recipient = {
  id: string
  name: string
  accountNumber: string
  initials: string
  deliveryMethods: string
  country: string
}

const RECIPIENTS: Recipient[] = [
  {
    id: "you",
    name: "You (Leela Delphine)",
    accountNumber: "Multiple delivery methods",
    initials: "LD",
    deliveryMethods: "multiple",
    country: "us"
  },
  {
    id: "andrew",
    name: "Andrew Caligh",
    accountNumber: "Multiple delivery methods",
    initials: "AC",
    deliveryMethods: "multiple",
    country: "in"
  },
  {
    id: "rohan",
    name: "Rohan Singh",
    accountNumber: "Account •••• 1234",
    initials: "RS",
    deliveryMethods: "bank",
    country: "in"
  },
  {
    id: "mateo",
    name: "Mateo Castillo",
    accountNumber: "Account •••• 1234",
    initials: "MC",
    deliveryMethods: "bank",
    country: "ar"
  },
  {
    id: "jasmine",
    name: "Jasmine Rees",
    accountNumber: "Account •••• 1234",
    initials: "JR",
    deliveryMethods: "bank",
    country: "ca"
  }
]

export default function RecipientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredRecipients = RECIPIENTS.filter(recipient => {
    const matchesSearch = recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || 
      (filter === "my-recipients" && recipient.id !== "you") ||
      (filter === "contacts" && recipient.deliveryMethods === "bank")
    return matchesSearch && matchesFilter
  })

  return (
    <main className="min-h-screen p-4 max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Recipients</h1>
        <p className="text-sm text-muted-foreground">
          Manage your recipients and their payment details.
        </p>
      </div>

      {/* Filters */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full">
          <TabsTrigger value="all" className="w-full">All</TabsTrigger>
          <TabsTrigger value="my-recipients" className="w-full">My recipients</TabsTrigger>
          <TabsTrigger value="contacts" className="w-full">Contacts</TabsTrigger>
          <TabsTrigger value="groups" className="w-full">Groups</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipients"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Add Recipient Button */}
      <Button 
        variant="outline"
        className="w-full h-auto py-4 flex items-center justify-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add a new recipient
      </Button>

      {/* Recipients List */}
      <div className="space-y-1">
        {filteredRecipients.map((recipient) => (
          <button
            key={recipient.id}
            className="w-full flex items-center gap-4 p-4 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
          >
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={`/avatars/${recipient.id}.png`} alt={recipient.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {recipient.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="font-medium leading-none mb-1">{recipient.name}</div>
              <div className="text-sm text-muted-foreground">{recipient.accountNumber}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </main>
  )
} 