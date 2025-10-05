import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Moon,
  Sun,
  LogOut,
  Info,
  CheckCircle,
  AlertCircle,
  User,
  FilePlus,
  Edit,
  Trash,
  Upload,
  DollarSign,
  CalendarDays,
  BarChart3,
  ClipboardList,
  Users,
  Settings,
  FileText,
} from "lucide-react"

// ---------- Данные ----------

const menuItems = [
  { key: "requests", label: "Заявки", icon: <ClipboardList className="w-4 h-4 mr-2" /> },
  { key: "clients", label: "Клиенты", icon: <Users className="w-4 h-4 mr-2" /> },
  { key: "balances", label: "Балансы", icon: <DollarSign className="w-4 h-4 mr-2" /> },
  { key: "services", label: "Услуги", icon: <FileText className="w-4 h-4 mr-2" /> },
  { key: "docs", label: "Документы", icon: <Upload className="w-4 h-4 mr-2" /> },
  { key: "stats", label: "Статистика", icon: <BarChart3 className="w-4 h-4 mr-2" /> },
]

const data = {
  requests: [
    {
      id: 1,
      title: "Диагностика двигателя",
      desc: "Проверка состояния ДВС",
      status: "В работе",
      client: "ИП Петров",
    },
    {
      id: 2,
      title: "Замена масла",
      desc: "Плановое ТО клиента",
      status: "Завершено",
      client: "ООО АвтоПро",
    },
    {
      id: 3,
      title: "Полировка кузова",
      desc: "Удаление мелких царапин",
      status: "Ожидает подтверждения",
      client: "ИП Иванов",
    },
  ],
  clients: [
    { id: 1, name: "ИП Петров", projects: 5, active: true },
    { id: 2, name: "ООО АвтоПро", projects: 2, active: true },
    { id: 3, name: "ИП Иванов", projects: 1, active: false },
  ],
  balances: [
    { id: 1, name: "ИП Петров", balance: 420 },
    { id: 2, name: "ООО АвтоПро", balance: 950 },
    { id: 3, name: "ИП Иванов", balance: -30 },
  ],
  services: [
    { id: 1, name: "Замена масл", price: 30 },
    { id: 2, name: "Диагностика двигателя", price: 60 },
    { id: 3, name: "Полировка кузова", price: 80 },
  ],
  docs: [
    { id: 1, name: "Отчёт Петров.pdf" },
    { id: 2, name: "Акт-выполненных FastCar.jpg" },
  ],
}

// ---------- Sidebar ----------

function Sidebar({ active, setActive, dark, toggleTheme }: any) {
  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold mb-4">Админ-панель</h1>
      {menuItems.map((item) => (
        <Button
          key={item.key}
          variant={active === item.key ? "default" : "ghost"}
          className="justify-start flex items-center"
          onClick={() => setActive(item.key)}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
      <Separator className="my-4" />
      <Button variant="outline" onClick={toggleTheme}>
        {dark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
        {dark ? "Светлая тема" : "Тёмная тема"}
      </Button>
    </aside>
  )
}

// ---------- Header ----------

function Header({ toggleTheme, dark }: any) {
  return (
    <header className="border-b h-16 px-6 flex items-center justify-between bg-card">
      <Input placeholder="Поиск..." className="w-72" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/100" alt="admin" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <span className="font-medium">Admin</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Профиль</DropdownMenuLabel>
          <DropdownMenuItem onClick={toggleTheme}>
            {dark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            {dark ? "Светлая тема" : "Тёмная тема"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" /> Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

// ---------- Таблица заявок ----------

function RequestsTable({ requests }: any) {
  const getStatusIcon = (status: string) =>
    status === "Завершено"
      ? <CheckCircle className="text-green-500 w-4 h-4" />
      : status === "Ожидает подтверждения"
        ? <AlertCircle className="text-yellow-500 w-4 h-4" />
        : <Info className="text-blue-500 w-4 h-4" />

  return (
    <div className="flex flex-col gap-4">
      {requests.map((req: any) => (
        <Card key={req.id} className="transition hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">{req.title}</CardTitle>
            {getStatusIcon(req.status)}
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">{req.desc}</p>
            <p className="text-sm flex items-center gap-1 text-muted-foreground">
              <User className="w-4 h-4" /> {req.client}
            </p>

            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="secondary">Одобрить</Button>
              <Button size="sm" variant="outline">Отклонить</Button>
              <Button size="sm" variant="outline">Пауза</Button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-3" variant="secondary" size="sm">
                  Прикрепить документ
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Прикрепить документ</DialogTitle>
                  <DialogDescription>PDF, JPG, PNG</DialogDescription>
                </DialogHeader>
                <div className="mt-3 flex flex-col gap-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" /> Выбрать файл
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Загрузите документ, связанный с заявкой.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ---------- Каталог услуг ----------

function ServicesTable({ services }: any) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((s: any) => (
        <Card key={s.id}>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{s.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{s.price}$</p>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button size="sm" variant="secondary">
              <Edit className="w-4 h-4 mr-1" /> Редактировать
            </Button>
            <Button size="sm" variant="destructive">
              <Trash className="w-4 h-4 mr-1" /> Удалить
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button className="mt-4" variant="outline">
        <FilePlus className="w-4 h-4 mr-2" /> Добавить услугу
      </Button>
    </div>
  )
}

// ---------- Балансы ----------

function BalancesTable({ balances }: any) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {balances.map((b: any) => (
        <Card key={b.id}>
          <CardHeader>
            <CardTitle>{b.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-lg ${b.balance >= 0 ? "text-green-500" : "text-red-500"}`}>
              {b.balance >= 0 ? `+${b.balance}$` : `${b.balance}$`}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="mt-2">
                  <DollarSign className="w-4 h-4 mr-1" /> Изменить баланс
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Изменить баланс клиента</DialogTitle>
                </DialogHeader>
                <Input placeholder="Введите сумму..." type="number" />
                <Button className="mt-3">Сохранить</Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ---------- Документы ----------

function DocsList({ docs }: any) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {docs.map((d: any) => (
        <Card key={d.id}>
          <CardHeader>
            <CardTitle>{d.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" size="sm">Скачать</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ---------- Логин ----------

function LoginScreen({ onLogin }: any) {
  const [login, setLogin] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (login === "1" && pass === "1") onLogin()
    else setError("Неверные данные")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Вход администратора</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
          <Input
            placeholder="Пароль"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button onClick={handleLogin}>Войти</Button>
        </CardContent>
      </Card>
    </div>
  )
}

// ---------- Статистика ----------

function StatsTable({ requests }: any) {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  // Заглушка "расчёта"
  const total = requests.length
  const completed = requests.filter((r: any) => r.status === "Завершено").length
  const inWork = requests.filter((r: any) => r.status === "В работе").length
  const waiting = requests.filter((r: any) => r.status.includes("Ожидает")).length
  const totalSum = requests.reduce((acc: number, r: any) => acc + (r.sum || 0), 0)
  const avg = total ? Math.round(totalSum / total) : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-8 h-8" />
          <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          <span>—</span>
          <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
        <Button>Показать</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Всего заявок</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{total}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Завершено</CardTitle></CardHeader>
          <CardContent><p className="text-2xl text-green-500 font-bold">{completed}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>В работе</CardTitle></CardHeader>
          <CardContent><p className="text-2xl text-blue-500 font-bold">{inWork}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Ожидает</CardTitle></CardHeader>
          <CardContent><p className="text-2xl text-yellow-500 font-bold">{waiting}</p></CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Общая сумма</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{totalSum}$</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Средний чек</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{avg}$</p></CardContent>
        </Card>
      </div>
    </div>
  )
}


// ---------- App ----------

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

export default function App() {
  const [active, setActive] = useState("requests")
  const [dark, setDark] = useState(false)
  const [isLogged, setLogged] = useState(false)

  const toggleTheme = () => {
    setDark((prev) => {
      const newTheme = !prev
      document.documentElement.classList.toggle("dark", newTheme)
      localStorage.theme = newTheme ? "dark" : "light"
      return newTheme
    })
  }


  if (!isLogged) return <LoginScreen onLogin={() => setLogged(true)} />

  return (
    <div
      className={`flex h-screen ${dark ? "dark bg-background text-foreground" : "bg-background text-foreground"
        }`}
    >
      <Sidebar active={active} setActive={setActive} dark={dark} toggleTheme={toggleTheme} />
      <div className="flex-1 flex flex-col">
        <Header toggleTheme={toggleTheme} dark={dark} />
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6">
            {menuItems.find((m) => m.key === active)?.label}
          </h2>
          {active === "requests" && <RequestsTable requests={data.requests} />}
          {active === "clients" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.clients.map((c: any) => (
                <Card key={c.id}>
                  <CardHeader>
                    <CardTitle>{c.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Автомобилей: {c.projects}</p>
                    <p className={`text-sm mt-1 ${c.active ? "text-green-500" : "text-red-500"}`}>
                      {c.active ? "Активен" : "Неактивен"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {active === "balances" && <BalancesTable balances={data.balances} />}
          {active === "services" && <ServicesTable services={data.services} />}
          {active === "docs" && <DocsList docs={data.docs} />}
          {active === "stats" && <StatsTable requests={data.requests} />}

        </main>
      </div>
    </div>
  )
}
