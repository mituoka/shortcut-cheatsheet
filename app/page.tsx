"use client"

import { useState } from "react"
import { Search, Globe, Play, Code2, Palette, Bot, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { shortcutsData } from "@/lib/shortcuts-data"

const iconMap = {
  Globe,
  Play,
  Code2,
  Palette,
  Bot,
  Sparkles,
}

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 tracking-tight">
            Shortcut Cheatsheet
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            よく使うアプリのショートカットキーを素早く確認
          </p>
        </header>

        <div className="mb-4 relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="ショートカットを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-sm border-slate-300 dark:border-slate-700"
          />
        </div>

        <Tabs defaultValue="Chrome" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-4 h-auto p-1 bg-slate-200/50 dark:bg-slate-800/50">
            {shortcutsData.map((app) => {
              const Icon = iconMap[app.icon as keyof typeof iconMap]
              return (
                <TabsTrigger
                  key={app.name}
                  value={app.name}
                  className="text-xs py-2 px-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
                >
                  <Icon className="w-4 h-4 mr-1.5" />
                  <span className="hidden sm:inline">{app.name}</span>
                  <span className="sm:hidden">{app.name.split(" ")[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {shortcutsData.map((app) => {
            const filteredShortcuts = filterShortcuts(app.name)
            const appCategories = categories(app.name)

            return (
              <TabsContent key={app.name} value={app.name} className="space-y-4 mt-0">
                {searchQuery && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    {filteredShortcuts.length}件のショートカットが見つかりました
                  </div>
                )}

                {filteredShortcuts.length === 0 ? (
                  <Card className="p-8 text-center text-slate-500 text-sm border-dashed">
                    該当するショートカットが見つかりませんでした
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
                          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                            <span className="w-1 h-4 bg-slate-400 dark:bg-slate-600 rounded-full mr-2"></span>
                            {category}
                          </h2>
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {categoryShortcuts.map((shortcut, index) => (
                              <Card
                                key={index}
                                className="p-3 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                                    {shortcut.description}
                                  </p>
                                  <div className="flex gap-1 flex-wrap justify-end flex-shrink-0">
                                    {shortcut.keys.map((key, i) => (
                                      <div key={i} className="flex items-center gap-0.5">
                                        <Badge
                                          variant="secondary"
                                          className="font-mono text-[10px] px-1.5 py-0.5 h-5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 group-hover:border-slate-400 dark:group-hover:border-slate-500 transition-colors"
                                        >
                                          {key}
                                        </Badge>
                                        {i < shortcut.keys.length - 1 && (
                                          <span className="text-slate-400 text-xs">+</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )
                    })}

                    {filteredShortcuts.some((s) => !s.category) && (
                      <div>
                        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                          <span className="w-1 h-4 bg-slate-400 dark:bg-slate-600 rounded-full mr-2"></span>
                          その他
                        </h2>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {filteredShortcuts
                            .filter((s) => !s.category)
                            .map((shortcut, index) => (
                              <Card
                                key={index}
                                className="p-3 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                                    {shortcut.description}
                                  </p>
                                  <div className="flex gap-1 flex-wrap justify-end flex-shrink-0">
                                    {shortcut.keys.map((key, i) => (
                                      <div key={i} className="flex items-center gap-0.5">
                                        <Badge
                                          variant="secondary"
                                          className="font-mono text-[10px] px-1.5 py-0.5 h-5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 group-hover:border-slate-400 dark:group-hover:border-slate-500 transition-colors"
                                        >
                                          {key}
                                        </Badge>
                                        {i < shortcut.keys.length - 1 && (
                                          <span className="text-slate-400 text-xs">+</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
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

        <footer className="mt-8 text-center text-xs text-slate-500 dark:text-slate-600">
          <p>Next.js + shadcn/ui</p>
        </footer>
      </div>
    </div>
  )
}
