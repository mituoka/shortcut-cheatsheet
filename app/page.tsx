"use client"

import { Folder, Laptop, Globe, Play, Code2, Palette, Bot, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
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
  const filterShortcuts = (appName: string) => {
    const app = shortcutsData.find(a => a.name === appName)
    if (!app) return []
    return app.shortcuts
  }

  const categories = (appName: string) => {
    const app = shortcutsData.find(a => a.name === appName)
    if (!app) return []
    const uniqueCategories = [...new Set(app.shortcuts.map(s => s.category).filter(Boolean))]
    return uniqueCategories as string[]
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-3 py-3 max-w-[1600px]">
        <header className="text-center mb-3">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Shortcut Cheatsheet
          </h1>
        </header>

        <Tabs defaultValue="Finder" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-2 h-auto p-0.5 gap-0.5">
            {shortcutsData.map((app) => {
              const Icon = iconMap[app.icon as keyof typeof iconMap]
              return (
                <TabsTrigger
                  key={app.name}
                  value={app.name}
                  className="text-[10px] py-1.5 px-2"
                >
                  <Icon className="w-3 h-3 mr-1" />
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
              <TabsContent key={app.name} value={app.name} className="mt-0">(
                <div className="space-y-2">
                    {appCategories.map((category) => {
                      const categoryShortcuts = filteredShortcuts.filter(
                        (s) => s.category === category
                      )
                      if (categoryShortcuts.length === 0) return null

                      return (
                        <div key={category} className="border rounded-lg overflow-hidden">
                          <div className="bg-slate-100 dark:bg-slate-900 px-2 py-1 border-b">
                            <h2 className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                              {category}
                            </h2>
                          </div>
                          <Table>
                            <TableBody>
                              {categoryShortcuts.map((shortcut, index) => (
                                <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                  <TableCell className="py-1.5 px-2 text-[11px] text-slate-700 dark:text-slate-300 w-[60%]">
                                    {shortcut.description}
                                  </TableCell>
                                  <TableCell className="py-1.5 px-2 text-right">
                                    <div className="flex gap-0.5 justify-end flex-wrap">
                                      {shortcut.keys.map((key, i) => (
                                        <div key={i} className="flex items-center gap-0.5">
                                          <Badge
                                            variant="outline"
                                            className="font-mono text-[9px] px-1 py-0 h-4 bg-white dark:bg-slate-800"
                                          >
                                            {key}
                                          </Badge>
                                          {i < shortcut.keys.length - 1 && (
                                            <span className="text-slate-400 text-[9px]">+</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )
                    })}

                    {filteredShortcuts.some((s) => !s.category) && (
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-900 px-2 py-1 border-b">
                          <h2 className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            その他
                          </h2>
                        </div>
                        <Table>
                          <TableBody>
                            {filteredShortcuts
                              .filter((s) => !s.category)
                              .map((shortcut, index) => (
                                <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                  <TableCell className="py-1.5 px-2 text-[11px] text-slate-700 dark:text-slate-300 w-[60%]">
                                    {shortcut.description}
                                  </TableCell>
                                  <TableCell className="py-1.5 px-2 text-right">
                                    <div className="flex gap-0.5 justify-end flex-wrap">
                                      {shortcut.keys.map((key, i) => (
                                        <div key={i} className="flex items-center gap-0.5">
                                          <Badge
                                            variant="outline"
                                            className="font-mono text-[9px] px-1 py-0 h-4 bg-white dark:bg-slate-800"
                                          >
                                            {key}
                                          </Badge>
                                          {i < shortcut.keys.length - 1 && (
                                            <span className="text-slate-400 text-[9px]">+</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>

        <footer className="mt-3 text-center text-[9px] text-slate-500">
          Next.js + shadcn/ui
        </footer>
      </div>
    </div>
  )
}
