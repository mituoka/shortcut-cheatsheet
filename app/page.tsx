"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { shortcutsData } from "@/lib/shortcuts-data"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const filterShortcuts = (appName: string) => {
    const app = shortcutsData.find(a => a.name === appName)
    if (!app) return []

    if (!searchQuery) return app.shortcuts

    const query = searchQuery.toLowerCase()
    return app.shortcuts.filter(
      shortcut =>
        shortcut.description.toLowerCase().includes(query) ||
        shortcut.keys.some(key => key.toLowerCase().includes(query)) ||
        shortcut.category?.toLowerCase().includes(query)
    )
  }

  const categories = (appName: string) => {
    const app = shortcutsData.find(a => a.name === appName)
    if (!app) return []
    const uniqueCategories = [...new Set(app.shortcuts.map(s => s.category).filter(Boolean))]
    return uniqueCategories as string[]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Shortcut Cheatsheet
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            よく使うアプリのショートカットキーを素早く確認
          </p>
        </header>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="ショートカットを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        <Tabs defaultValue="Chrome" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {shortcutsData.map((app) => (
              <TabsTrigger key={app.name} value={app.name} className="text-base">
                <span className="mr-2">{app.icon}</span>
                {app.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {shortcutsData.map((app) => {
            const filteredShortcuts = filterShortcuts(app.name)
            const appCategories = categories(app.name)

            return (
              <TabsContent key={app.name} value={app.name} className="space-y-6">
                {searchQuery && (
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {filteredShortcuts.length}件のショートカットが見つかりました
                  </div>
                )}

                {filteredShortcuts.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center text-slate-500">
                      該当するショートカットが見つかりませんでした
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {appCategories.map((category) => {
                      const categoryShortcuts = filteredShortcuts.filter(
                        (s) => s.category === category
                      )
                      if (categoryShortcuts.length === 0) return null

                      return (
                        <div key={category}>
                          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                            {category}
                          </h2>
                          <div className="grid gap-3 md:grid-cols-2">
                            {categoryShortcuts.map((shortcut, index) => (
                              <Card key={index} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-base font-medium">
                                    {shortcut.description}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex gap-2 flex-wrap">
                                    {shortcut.keys.map((key, i) => (
                                      <div key={i} className="flex items-center gap-1">
                                        <Badge
                                          variant="secondary"
                                          className="font-mono text-sm px-3 py-1"
                                        >
                                          {key}
                                        </Badge>
                                        {i < shortcut.keys.length - 1 && (
                                          <span className="text-slate-400">+</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )
                    })}

                    {/* カテゴリなしのショートカット */}
                    {filteredShortcuts.some((s) => !s.category) && (
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                          その他
                        </h2>
                        <div className="grid gap-3 md:grid-cols-2">
                          {filteredShortcuts
                            .filter((s) => !s.category)
                            .map((shortcut, index) => (
                              <Card key={index} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-base font-medium">
                                    {shortcut.description}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex gap-2 flex-wrap">
                                    {shortcut.keys.map((key, i) => (
                                      <div key={i} className="flex items-center gap-1">
                                        <Badge
                                          variant="secondary"
                                          className="font-mono text-sm px-3 py-1"
                                        >
                                          {key}
                                        </Badge>
                                        {i < shortcut.keys.length - 1 && (
                                          <span className="text-slate-400">+</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            )
          })}
        </Tabs>

        <footer className="mt-12 text-center text-sm text-slate-500">
          <p>Created with Next.js + shadcn/ui</p>
          <p className="mt-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 dark:hover:text-slate-300 underline"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
