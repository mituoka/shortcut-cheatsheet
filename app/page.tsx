"use client"

import { Folder, Laptop, Globe, Play, Code2, Palette, Bot, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { shortcutsData } from "@/lib/shortcuts-data"

const iconMap = {
  Folder,
  Laptop,
  Globe,
  Play,
  Code2,
  Palette,
  Bot,
  Sparkles,
}

export default function Home() {
  const categories = (appName: string) => {
    const app = shortcutsData.find(a => a.name === appName)
    if (!app) return []
    const uniqueCategories = [...new Set(app.shortcuts.map(s => s.category).filter(Boolean))]
    return uniqueCategories as string[]
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-4 max-w-[1800px]">
        <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-50 mb-4">
          Shortcut Cheatsheet
        </h1>

        <Tabs defaultValue="Finder" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-4 h-auto p-1">
            {shortcutsData.map((app) => {
              const Icon = iconMap[app.icon as keyof typeof iconMap]
              return (
                <TabsTrigger
                  key={app.name}
                  value={app.name}
                  className="text-xs py-2 px-2"
                >
                  <Icon className="w-3.5 h-3.5 mr-1.5" />
                  <span className="hidden sm:inline">{app.name}</span>
                  <span className="sm:hidden">{app.name.split(" ")[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {shortcutsData.map((app) => {
            const appCategories = categories(app.name)

            return (
              <TabsContent key={app.name} value={app.name} className="mt-0 space-y-4">
                {appCategories.map((category) => {
                  const categoryShortcuts = app.shortcuts.filter(
                    (s) => s.category === category
                  )
                  if (categoryShortcuts.length === 0) return null

                  return (
                    <div key={category}>
                      <h2 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 px-1 uppercase tracking-wide">
                        {category}
                      </h2>
                      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categoryShortcuts.map((shortcut, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-3 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                          >
                            <span className="text-xs text-slate-700 dark:text-slate-300 flex-1 min-w-0">
                              {shortcut.description}
                            </span>
                            <div className="flex gap-1 items-center flex-shrink-0">
                              {shortcut.keys.map((key, i) => (
                                <div key={i} className="flex items-center gap-0.5">
                                  <Badge
                                    variant="secondary"
                                    className="font-mono text-[10px] px-1.5 py-0.5 h-5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
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
                        ))}
                      </div>
                    </div>
                  )
                })}

                {app.shortcuts.some((s) => !s.category) && (
                  <div>
                    <h2 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 px-1 uppercase tracking-wide">
                      その他
                    </h2>
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {app.shortcuts
                        .filter((s) => !s.category)
                        .map((shortcut, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-3 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                          >
                            <span className="text-xs text-slate-700 dark:text-slate-300 flex-1 min-w-0">
                              {shortcut.description}
                            </span>
                            <div className="flex gap-1 items-center flex-shrink-0">
                              {shortcut.keys.map((key, i) => (
                                <div key={i} className="flex items-center gap-0.5">
                                  <Badge
                                    variant="secondary"
                                    className="font-mono text-[10px] px-1.5 py-0.5 h-5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
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
                        ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
