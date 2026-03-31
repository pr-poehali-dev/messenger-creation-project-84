import { useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/23e38a45-2904-4d00-a4e7-bf566f6f0a73/files/8c032031-5b95-478a-b513-93a46b18a28f.jpg";

const NAV_ITEMS = [
  { id: "chats", icon: "MessageCircle", label: "Чаты", badge: 3 },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "groups", icon: "UsersRound", label: "Группы", badge: 1 },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "notifications", icon: "Bell", label: "Уведомления", badge: 5 },
  { id: "profile", icon: "UserCircle", label: "Профиль" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];

const CHATS = [
  { id: 1, name: "Аноним #4471", msg: "Сообщение удалится через 5 мин", time: "18:42", unread: 2, online: true, encrypted: true, selfDestruct: true, avatar: "👤" },
  { id: 2, name: "Призрак_77", msg: "Ключ обменян успешно ✓", time: "17:15", unread: 0, online: true, encrypted: true, selfDestruct: false, avatar: "👻" },
  { id: 3, name: "СекретнаяГруппа", msg: "[Зашифровано]", time: "16:00", unread: 7, online: false, encrypted: true, selfDestruct: true, avatar: "🔒" },
  { id: 4, name: "Тень_X", msg: "Подключение установлено", time: "14:30", unread: 0, online: false, encrypted: true, selfDestruct: false, avatar: "🌑" },
  { id: 5, name: "ЦифраSec", msg: "Я уже в сети", time: "вчера", unread: 0, online: true, encrypted: true, selfDestruct: false, avatar: "⚡" },
];

const MESSAGES = [
  { id: 1, text: "Соединение установлено. Сквозное шифрование активно.", time: "18:30", mine: false, selfDestruct: false, deleted: false },
  { id: 2, text: "Отлично. Никто не видит наш диалог?", time: "18:31", mine: true, selfDestruct: false, deleted: false },
  { id: 3, text: "Верно. AES-256 + Signal Protocol. Даже серверы не знают содержимого.", time: "18:32", mine: false, selfDestruct: false, deleted: false },
  { id: 4, text: "Это сообщение удалится через 5 минут 🔥", time: "18:40", mine: true, selfDestruct: true, deleted: false },
  { id: 5, text: "Принято. Таймер запущен.", time: "18:41", mine: false, selfDestruct: true, deleted: false },
];

const CONTACTS = [
  { id: 1, name: "Аноним #4471", status: "В сети", avatar: "👤", trusted: true },
  { id: 2, name: "Призрак_77", status: "Недавно", avatar: "👻", trusted: true },
  { id: 3, name: "Тень_X", status: "Не в сети", avatar: "🌑", trusted: false },
  { id: 4, name: "ЦифраSec", status: "В сети", avatar: "⚡", trusted: true },
  { id: 5, name: "Мрак_Про", status: "Не в сети", avatar: "🎭", trusted: false },
  { id: 6, name: "Ключ_101", status: "В сети", avatar: "🗝️", trusted: true },
];

const GROUPS = [
  { id: 1, name: "Приватный штаб", members: 12, msg: "Зашифрованная конференция активна", avatar: "🔐", encrypted: true },
  { id: 2, name: "Тёмная сеть", members: 5, msg: "Новый участник добавлен анонимно", avatar: "🌐", encrypted: true },
  { id: 3, name: "Операция Тень", members: 3, msg: "[Сообщение удалено]", avatar: "🎯", encrypted: true },
];

const CALLS = [
  { id: 1, name: "Призрак_77", type: "incoming", time: "18:00", duration: "4:32", avatar: "👻", encrypted: true },
  { id: 2, name: "Аноним #4471", type: "outgoing", time: "14:20", duration: "1:05", avatar: "👤", encrypted: true },
  { id: 3, name: "ЦифраSec", type: "missed", time: "вчера", duration: "", avatar: "⚡", encrypted: true },
  { id: 4, name: "Тень_X", type: "outgoing", time: "вчера", duration: "12:44", avatar: "🌑", encrypted: true },
];

const NOTIFICATIONS = [
  { id: 1, text: "Новое зашифрованное сообщение от Аноним #4471", time: "5 мин назад", icon: "MessageCircle", color: "text-cyan-400" },
  { id: 2, text: "Самоудаляющееся сообщение истекает через 2 минуты", time: "только что", icon: "Timer", color: "text-orange-400" },
  { id: 3, text: "Призрак_77 вошёл в сеть", time: "10 мин назад", icon: "UserCheck", color: "text-green-400" },
  { id: 4, text: "Обмен ключами выполнен с ЦифраSec", time: "1 час назад", icon: "KeyRound", color: "text-purple-400" },
  { id: 5, text: "Группа «Операция Тень» обновила ключи шифрования", time: "2 часа назад", icon: "ShieldCheck", color: "text-cyan-400" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("chats");
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [msgInput, setMsgInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentChat = CHATS.find(c => c.id === activeChat);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-dark-900 font-sans" style={{ background: "var(--bg-deep)" }}>

      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #00f5ff 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #bf5fff 0%, transparent 70%)" }} />
      </div>

      {/* === ЛЕВЫЙ НАВБАР === */}
      <nav className="w-16 flex flex-col items-center py-4 gap-1 z-20 relative" style={{ background: "#060810", borderRight: "1px solid rgba(0,245,255,0.08)" }}>

        {/* Логотип */}
        <div className="mb-4 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-cyan-500/30 mb-1">
            <img src={LOGO_URL} alt="CipherTalk" className="w-full h-full object-cover" />
          </div>
        </div>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveSection(item.id); setSidebarOpen(true); }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group"
            style={{
              background: activeSection === item.id ? "rgba(0,245,255,0.12)" : "transparent",
              boxShadow: activeSection === item.id ? "0 0 12px rgba(0,245,255,0.2)" : "none",
            }}
            title={item.label}
          >
            <Icon
              name={item.icon as any}
              size={18}
              className="transition-colors duration-200"
              style={{ color: activeSection === item.id ? "#00f5ff" : "rgba(255,255,255,0.35)" }}
            />
            {item.badge && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-black"
                style={{ background: "#00f5ff" }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}

        {/* Аватар пользователя снизу */}
        <div className="mt-auto">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-base cursor-pointer ring-2 ring-cyan-500/20 hover:ring-cyan-500/50 transition-all"
            style={{ background: "rgba(0,245,255,0.08)" }}>
            🕶️
          </div>
          <div className="w-2 h-2 rounded-full mx-auto mt-1" style={{ background: "#39ff14", boxShadow: "0 0 6px #39ff14" }} />
        </div>
      </nav>

      {/* === СПИСОК (САЙДБАР) === */}
      <aside className="w-72 flex flex-col z-10 relative flex-shrink-0" style={{ background: "#080b12", borderRight: "1px solid rgba(0,245,255,0.06)" }}>

        {/* Заголовок секции */}
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-display font-semibold text-white text-base tracking-wider uppercase">
                {NAV_ITEMS.find(n => n.id === activeSection)?.label}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#39ff14" }} />
                <span className="text-[11px]" style={{ color: "rgba(0,245,255,0.6)" }}>защищено · E2E</span>
              </div>
            </div>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: "rgba(0,245,255,0.1)", color: "#00f5ff" }}>
              <Icon name="Plus" size={14} />
            </button>
          </div>

          {/* Поиск */}
          <div className="relative">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(0,245,255,0.4)" }} />
            <input
              placeholder="Найти..."
              className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,245,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                fontSize: "12px",
              }}
            />
          </div>
        </div>

        {/* Список элементов */}
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5 scrollbar-thin">

          {activeSection === "chats" && CHATS.map((chat) => (
            <button key={chat.id} onClick={() => setActiveChat(chat.id)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left group animate-fade-in"
              style={{
                background: activeChat === chat.id ? "rgba(0,245,255,0.08)" : "transparent",
                borderLeft: activeChat === chat.id ? "2px solid #00f5ff" : "2px solid transparent",
              }}>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "rgba(0,245,255,0.08)" }}>
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{ background: "#39ff14", borderColor: "#080b12" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.85)" }}>{chat.name}</span>
                  <span className="text-[10px] flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{chat.time}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {chat.encrypted && <Icon name="Lock" size={10} style={{ color: "#00f5ff", flexShrink: 0 }} />}
                  {chat.selfDestruct && <Icon name="Timer" size={10} style={{ color: "#ff6b35", flexShrink: 0 }} />}
                  <span className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{chat.msg}</span>
                </div>
              </div>
              {chat.unread > 0 && (
                <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-black flex-shrink-0"
                  style={{ background: "#00f5ff" }}>
                  {chat.unread}
                </span>
              )}
            </button>
          ))}

          {activeSection === "contacts" && CONTACTS.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 animate-fade-in cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: "rgba(0,245,255,0.07)" }}>
                {c.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{c.name}</span>
                  {c.trusted && <Icon name="ShieldCheck" size={11} style={{ color: "#00f5ff" }} />}
                </div>
                <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{c.status}</span>
              </div>
              <button className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:opacity-80"
                style={{ background: "rgba(0,245,255,0.1)", color: "#00f5ff" }}>
                <Icon name="MessageCircle" size={13} />
              </button>
            </div>
          ))}

          {activeSection === "groups" && GROUPS.map((g) => (
            <div key={g.id} className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 animate-fade-in cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: "rgba(191,95,255,0.1)" }}>
                {g.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{g.name}</span>
                  {g.encrypted && <Icon name="Lock" size={11} style={{ color: "#bf5fff" }} />}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{g.members} участников ·</span>
                  <span className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.25)" }}>{g.msg}</span>
                </div>
              </div>
            </div>
          ))}

          {activeSection === "calls" && CALLS.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 animate-fade-in cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: "rgba(0,245,255,0.07)" }}>
                {c.avatar}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium block" style={{ color: "rgba(255,255,255,0.85)" }}>{c.name}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon
                    name={c.type === "incoming" ? "PhoneIncoming" : c.type === "missed" ? "PhoneMissed" : "PhoneOutgoing"}
                    size={11}
                    style={{ color: c.type === "missed" ? "#ff2d78" : c.type === "incoming" ? "#39ff14" : "rgba(0,245,255,0.7)" }}
                  />
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{c.time}{c.duration ? ` · ${c.duration}` : ""}</span>
                </div>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(57,255,20,0.1)", color: "#39ff14" }}>
                <Icon name="Phone" size={14} />
              </button>
            </div>
          ))}

          {activeSection === "notifications" && NOTIFICATIONS.map((n) => (
            <div key={n.id} className="flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 animate-fade-in cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(0,245,255,0.07)" }}>
                <Icon name={n.icon as any} size={14} className={n.color} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{n.text}</p>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>{n.time}</span>
              </div>
            </div>
          ))}

          {activeSection === "search" && (
            <div className="px-3 py-6 text-center animate-fade-in">
              <Icon name="Search" size={32} className="mx-auto mb-3 opacity-20" style={{ color: "#00f5ff" }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>Введите запрос для поиска</p>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="px-3 py-4 animate-fade-in space-y-2">
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3"
                  style={{ background: "rgba(0,245,255,0.08)", boxShadow: "0 0 20px rgba(0,245,255,0.1)" }}>
                  🕶️
                </div>
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>Аноним #0001</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(0,245,255,0.6)" }}>Анонимный режим активен</p>
              </div>
              {[{ label: "ID пользователя", val: "#CT-48291" }, { label: "Публичный ключ", val: "4A7F...9E2B" }, { label: "Статус", val: "В сети" }].map(item => (
                <div key={item.label} className="flex justify-between px-3 py-2.5 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,245,255,0.06)" }}>
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item.label}</span>
                  <span className="text-[11px] font-medium" style={{ color: "rgba(0,245,255,0.8)" }}>{item.val}</span>
                </div>
              ))}
            </div>
          )}

          {activeSection === "settings" && (
            <div className="px-3 py-3 animate-fade-in space-y-1">
              {[
                { icon: "Lock", label: "Сквозное шифрование", val: "AES-256", color: "#00f5ff" },
                { icon: "Timer", label: "Автоудаление", val: "5 мин", color: "#ff6b35" },
                { icon: "EyeOff", label: "Анонимный режим", val: "Вкл", color: "#39ff14" },
                { icon: "Fingerprint", label: "Блокировка приложения", val: "Face ID", color: "#bf5fff" },
                { icon: "Globe", label: "VPN туннель", val: "Активен", color: "#00f5ff" },
                { icon: "Bell", label: "Уведомления", val: "Только звук", color: "rgba(255,255,255,0.4)" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-white/5 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.03)" }}>
                  <Icon name={item.icon as any} size={14} style={{ color: item.color }} />
                  <span className="flex-1 text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>{item.label}</span>
                  <span className="text-[11px] font-medium" style={{ color: item.color }}>{item.val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* === ОСНОВНАЯ ОБЛАСТЬ (ЧАТ) === */}
      <main className="flex-1 flex flex-col min-w-0 relative">

        {activeSection === "chats" && currentChat ? (
          <>
            {/* Шапка чата */}
            <header className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0"
              style={{ background: "rgba(8,11,18,0.95)", borderBottom: "1px solid rgba(0,245,255,0.06)", backdropFilter: "blur(10px)" }}>
              <div className="relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl"
                  style={{ background: "rgba(0,245,255,0.08)" }}>
                  {currentChat.avatar}
                </div>
                {currentChat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: "#39ff14", borderColor: "#080b12" }} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{currentChat.name}</span>
                  <Icon name="Lock" size={11} style={{ color: "#00f5ff" }} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px]" style={{ color: "#39ff14" }}>E2E шифрование</span>
                  {currentChat.selfDestruct && (
                    <>
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                      <Icon name="Timer" size={10} style={{ color: "#ff6b35" }} />
                      <span className="text-[11px]" style={{ color: "#ff6b35" }}>Авто-удаление: 5 мин</span>
                    </>
                  )}
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: "rgba(57,255,20,0.1)", color: "#39ff14" }}>
                  <Icon name="Phone" size={15} />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: "rgba(0,245,255,0.1)", color: "#00f5ff" }}>
                  <Icon name="Video" size={15} />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                  <Icon name="MoreVertical" size={15} />
                </button>
              </div>
            </header>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
              style={{ background: "linear-gradient(180deg, #080b12 0%, #060810 100%)" }}>

              {/* Системное уведомление */}
              <div className="flex justify-center my-2">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.12)" }}>
                  <Icon name="ShieldCheck" size={11} style={{ color: "#00f5ff" }} />
                  <span className="text-[11px]" style={{ color: "rgba(0,245,255,0.7)" }}>
                    Сообщения зашифрованы · Signal Protocol
                  </span>
                </div>
              </div>

              {MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"} animate-fade-in`}>
                  <div className="max-w-xs lg:max-w-md">
                    <div className="px-4 py-2.5 rounded-2xl relative"
                      style={{
                        background: msg.mine
                          ? "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,245,255,0.08))"
                          : "rgba(255,255,255,0.05)",
                        border: msg.mine
                          ? "1px solid rgba(0,245,255,0.2)"
                          : "1px solid rgba(255,255,255,0.06)",
                        borderRadius: msg.mine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      }}>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{msg.text}</p>
                      <div className="flex items-center gap-1.5 mt-1.5 justify-end">
                        {msg.selfDestruct && <Icon name="Flame" size={10} style={{ color: "#ff6b35" }} />}
                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>{msg.time}</span>
                        {msg.mine && <Icon name="CheckCheck" size={11} style={{ color: "#00f5ff" }} />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ввод сообщения */}
            <div className="px-4 py-3 flex-shrink-0"
              style={{ background: "rgba(8,11,18,0.97)", borderTop: "1px solid rgba(0,245,255,0.06)" }}>

              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>
                  <Icon name="Paperclip" size={16} />
                </button>

                <div className="flex-1 relative">
                  <input
                    value={msgInput}
                    onChange={e => setMsgInput(e.target.value)}
                    placeholder="Зашифрованное сообщение..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,245,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  />
                </div>

                <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:opacity-80"
                  style={{ background: "rgba(255,107,53,0.15)", color: "#ff6b35" }}
                  title="Самоудаляющееся">
                  <Icon name="Timer" size={15} />
                </button>

                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: msgInput.trim() ? "rgba(0,245,255,0.2)" : "rgba(255,255,255,0.04)",
                    color: msgInput.trim() ? "#00f5ff" : "rgba(255,255,255,0.2)",
                    boxShadow: msgInput.trim() ? "0 0 12px rgba(0,245,255,0.2)" : "none",
                  }}>
                  <Icon name="Send" size={15} />
                </button>
              </div>

              {/* Статус шифрования */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#39ff14" }} />
                <span className="text-[10px]" style={{ color: "rgba(0,245,255,0.4)" }}>
                  AES-256 · Ключ обновлён 2 мин назад
                </span>
              </div>
            </div>
          </>
        ) : (
          /* Заглушка когда раздел не чат */
          <div className="flex-1 flex items-center justify-center"
            style={{ background: "linear-gradient(180deg, #080b12 0%, #060810 100%)" }}>
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 ring-2 ring-cyan-500/20"
                style={{ boxShadow: "0 0 30px rgba(0,245,255,0.1)" }}>
                <img src={LOGO_URL} alt="CipherTalk" className="w-full h-full object-cover" />
              </div>
              <h1 className="font-display text-2xl font-semibold tracking-widest mb-1" style={{ color: "#00f5ff" }}>
                CIPHERTALK
              </h1>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                Полное шифрование · Анонимность · Приватность
              </p>
              <div className="flex items-center justify-center gap-4 mt-5">
                {["AES-256", "E2E", "Zero-log"].map(tag => (
                  <div key={tag} className="px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{ background: "rgba(0,245,255,0.07)", border: "1px solid rgba(0,245,255,0.15)", color: "rgba(0,245,255,0.7)" }}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
