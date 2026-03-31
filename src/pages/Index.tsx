import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/23e38a45-2904-4d00-a4e7-bf566f6f0a73/files/8c032031-5b95-478a-b513-93a46b18a28f.jpg";

const NAV_ITEMS = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "groups", icon: "UsersRound", label: "Группы" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "notifications", icon: "Bell", label: "Уведомления" },
  { id: "profile", icon: "UserCircle", label: "Профиль" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];

const AVATARS = ["👤","👻","🔒","🌑","⚡","🎭","🗝️","🕶️","🦊","🐺"];

const INIT_CHATS = [
  { id: 1, name: "Аноним #4471", msg: "Сообщение удалится через 5 мин", time: "18:42", unread: 2, online: true, selfDestruct: true, avatar: "👤" },
  { id: 2, name: "Призрак_77", msg: "Ключ обменян успешно ✓", time: "17:15", unread: 0, online: true, selfDestruct: false, avatar: "👻" },
  { id: 3, name: "СекретнаяГруппа", msg: "[Зашифровано]", time: "16:00", unread: 7, online: false, selfDestruct: true, avatar: "🔒" },
  { id: 4, name: "Тень_X", msg: "Подключение установлено", time: "14:30", unread: 0, online: false, selfDestruct: false, avatar: "🌑" },
  { id: 5, name: "ЦифраSec", msg: "Я уже в сети", time: "вчера", unread: 0, online: true, selfDestruct: false, avatar: "⚡" },
];

const INIT_MESSAGES: Record<number, Msg[]> = {
  1: [
    { id: 1, text: "Соединение установлено. Сквозное шифрование активно.", time: "18:30", mine: false, selfDestruct: false },
    { id: 2, text: "Отлично. Никто не видит наш диалог?", time: "18:31", mine: true, selfDestruct: false },
    { id: 3, text: "Верно. AES-256 + Signal Protocol. Даже серверы не знают содержимого.", time: "18:32", mine: false, selfDestruct: false },
    { id: 4, text: "Это сообщение удалится через 5 минут 🔥", time: "18:40", mine: true, selfDestruct: true },
    { id: 5, text: "Принято. Таймер запущен.", time: "18:41", mine: false, selfDestruct: true },
  ],
  2: [
    { id: 1, text: "Привет, ключи обменяли?", time: "17:10", mine: false, selfDestruct: false },
    { id: 2, text: "Да, всё готово ✓", time: "17:15", mine: true, selfDestruct: false },
  ],
  3: [{ id: 1, text: "[Зашифровано]", time: "16:00", mine: false, selfDestruct: true }],
  4: [{ id: 1, text: "Подключение установлено", time: "14:30", mine: false, selfDestruct: false }],
  5: [{ id: 1, text: "Я уже в сети", time: "вчера", mine: false, selfDestruct: false }],
};

const INIT_CONTACTS = [
  { id: 1, name: "Аноним #4471", status: "В сети", avatar: "👤", trusted: true },
  { id: 2, name: "Призрак_77", status: "Недавно", avatar: "👻", trusted: true },
  { id: 3, name: "Тень_X", status: "Не в сети", avatar: "🌑", trusted: false },
  { id: 4, name: "ЦифраSec", status: "В сети", avatar: "⚡", trusted: true },
  { id: 5, name: "Мрак_Про", status: "Не в сети", avatar: "🎭", trusted: false },
  { id: 6, name: "Ключ_101", status: "В сети", avatar: "🗝️", trusted: true },
];

const INIT_GROUPS = [
  { id: 1, name: "Приватный штаб", members: 12, msg: "Зашифрованная конференция активна", avatar: "🔐" },
  { id: 2, name: "Тёмная сеть", members: 5, msg: "Новый участник добавлен анонимно", avatar: "🌐" },
  { id: 3, name: "Операция Тень", members: 3, msg: "[Сообщение удалено]", avatar: "🎯" },
];

const INIT_CALLS = [
  { id: 1, name: "Призрак_77", type: "incoming", time: "18:00", duration: "4:32", avatar: "👻" },
  { id: 2, name: "Аноним #4471", type: "outgoing", time: "14:20", duration: "1:05", avatar: "👤" },
  { id: 3, name: "ЦифраSec", type: "missed", time: "вчера", duration: "", avatar: "⚡" },
  { id: 4, name: "Тень_X", type: "outgoing", time: "вчера", duration: "12:44", avatar: "🌑" },
];

const INIT_NOTIFICATIONS = [
  { id: 1, text: "Новое зашифрованное сообщение от Аноним #4471", time: "5 мин назад", icon: "MessageCircle", color: "text-cyan-400", read: false },
  { id: 2, text: "Самоудаляющееся сообщение истекает через 2 минуты", time: "только что", icon: "Timer", color: "text-orange-400", read: false },
  { id: 3, text: "Призрак_77 вошёл в сеть", time: "10 мин назад", icon: "UserCheck", color: "text-green-400", read: true },
  { id: 4, text: "Обмен ключами выполнен с ЦифраSec", time: "1 час назад", icon: "KeyRound", color: "text-purple-400", read: true },
  { id: 5, text: "Группа «Операция Тень» обновила ключи шифрования", time: "2 часа назад", icon: "ShieldCheck", color: "text-cyan-400", read: true },
];

const INIT_SETTINGS = [
  { key: "e2e", icon: "Lock", label: "Сквозное шифрование", desc: "AES-256", color: "#00f5ff", enabled: true },
  { key: "selfDestruct", icon: "Timer", label: "Автоудаление сообщений", desc: "5 мин", color: "#ff6b35", enabled: true },
  { key: "anon", icon: "EyeOff", label: "Анонимный режим", desc: "Скрывает IP", color: "#39ff14", enabled: true },
  { key: "lock", icon: "Fingerprint", label: "Блокировка приложения", desc: "Face ID / PIN", color: "#bf5fff", enabled: false },
  { key: "vpn", icon: "Globe", label: "VPN туннель", desc: "Шифрует трафик", color: "#00f5ff", enabled: true },
  { key: "notif", icon: "Bell", label: "Уведомления", desc: "Только звук", color: "rgba(255,255,255,0.5)", enabled: true },
];

interface Msg { id: number; text: string; time: string; mine: boolean; selfDestruct: boolean; }
interface Chat { id: number; name: string; msg: string; time: string; unread: number; online: boolean; selfDestruct: boolean; avatar: string; }
interface Contact { id: number; name: string; status: string; avatar: string; trusted: boolean; }
interface Group { id: number; name: string; members: number; msg: string; avatar: string; }
interface Notif { id: number; text: string; time: string; icon: string; color: string; read: boolean; }
interface Setting { key: string; icon: string; label: string; desc: string; color: string; enabled: boolean; }

function now() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("chats");
  const [activeChat, setActiveChat] = useState<number>(1);
  const [msgInput, setMsgInput] = useState("");
  const [selfDestructMode, setSelfDestructMode] = useState(false);
  const [chats, setChats] = useState<Chat[]>(INIT_CHATS);
  const [messages, setMessages] = useState<Record<number, Msg[]>>(INIT_MESSAGES);
  const [contacts, setContacts] = useState<Contact[]>(INIT_CONTACTS);
  const [groups, setGroups] = useState<Group[]>(INIT_GROUPS);
  const [notifications, setNotifications] = useState<Notif[]>(INIT_NOTIFICATIONS);
  const [settings, setSettings] = useState<Setting[]>(INIT_SETTINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [listSearch, setListSearch] = useState("");

  // Модалки
  const [showNewChat, setShowNewChat] = useState(false);
  const [showNewContact, setShowNewContact] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactKey, setNewContactKey] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [profileName, setProfileName] = useState("Аноним #0001");
  const [editingProfile, setEditingProfile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const currentChat = chats.find(c => c.id === activeChat);
  const currentMessages = messages[activeChat] || [];

  const unreadCount = (sec: string) => {
    if (sec === "chats") return chats.reduce((s, c) => s + c.unread, 0);
    if (sec === "notifications") return notifications.filter(n => !n.read).length;
    return 0;
  };

  function sendMessage() {
    const text = msgInput.trim();
    if (!text) return;
    const newMsg: Msg = { id: Date.now(), text, time: now(), mine: true, selfDestruct: selfDestructMode };
    setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMsg] }));
    setChats(prev => prev.map(c => c.id === activeChat ? { ...c, msg: text, time: now(), unread: 0 } : c));
    setMsgInput("");
  }

  function createChat() {
    if (!newChatName.trim()) return;
    const id = Date.now();
    const newChat: Chat = { id, name: newChatName.trim(), msg: "Новый чат создан", time: now(), unread: 0, online: false, selfDestruct: false, avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)] };
    setChats(prev => [newChat, ...prev]);
    setMessages(prev => ({ ...prev, [id]: [] }));
    setActiveChat(id);
    setNewChatName("");
    setShowNewChat(false);
  }

  function createContact() {
    if (!newContactName.trim()) return;
    const newC: Contact = { id: Date.now(), name: newContactName.trim(), status: "Не в сети", avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)], trusted: false };
    setContacts(prev => [newC, ...prev]);
    setNewContactName("");
    setNewContactKey("");
    setShowNewContact(false);
  }

  function createGroup() {
    if (!newGroupName.trim()) return;
    const newG: Group = { id: Date.now(), name: newGroupName.trim(), members: 1, msg: "Группа создана", avatar: "🔐" };
    setGroups(prev => [newG, ...prev]);
    setNewGroupName("");
    setShowNewGroup(false);
  }

  function toggleSetting(key: string) {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, enabled: !s.enabled } : s));
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function deleteNotification(id: number) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  function trustContact(id: number) {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, trusted: !c.trusted } : c));
  }

  function deleteContact(id: number) {
    setContacts(prev => prev.filter(c => c.id !== id));
  }

  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(listSearch.toLowerCase()));
  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(listSearch.toLowerCase()));

  const searchResults = searchQuery.trim()
    ? [
        ...chats.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ type: "Чат", name: c.name, avatar: c.avatar })),
        ...contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ type: "Контакт", name: c.name, avatar: c.avatar })),
        ...groups.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase())).map(g => ({ type: "Группа", name: g.name, avatar: g.avatar })),
      ]
    : [];

  const plusAction = () => {
    if (activeSection === "chats") setShowNewChat(true);
    if (activeSection === "contacts") setShowNewContact(true);
    if (activeSection === "groups") setShowNewGroup(true);
  };

  const hasPlusSection = ["chats", "contacts", "groups"].includes(activeSection);

  return (
    <div className="h-screen w-screen flex overflow-hidden font-sans" style={{ background: "#060810" }}>

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #00f5ff 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #bf5fff 0%, transparent 70%)" }} />
      </div>

      {/* === МОДАЛКА: Новый чат === */}
      {showNewChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
          <div className="w-80 rounded-2xl p-6 animate-scale-in" style={{ background: "#0d1117", border: "1px solid rgba(0,245,255,0.15)" }}>
            <h3 className="font-display text-lg font-semibold mb-1 tracking-wider" style={{ color: "#00f5ff" }}>НОВЫЙ ЧАТ</h3>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Введите имя или псевдоним</p>
            <input
              autoFocus
              value={newChatName}
              onChange={e => setNewChatName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && createChat()}
              placeholder="Имя пользователя..."
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-3"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,245,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            />
            <div className="flex gap-2">
              <button onClick={() => setShowNewChat(false)} className="flex-1 py-2.5 rounded-xl text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                Отмена
              </button>
              <button onClick={createChat} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(0,245,255,0.15)", color: "#00f5ff", border: "1px solid rgba(0,245,255,0.25)" }}>
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === МОДАЛКА: Новый контакт === */}
      {showNewContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
          <div className="w-80 rounded-2xl p-6 animate-scale-in" style={{ background: "#0d1117", border: "1px solid rgba(191,95,255,0.2)" }}>
            <h3 className="font-display text-lg font-semibold mb-1 tracking-wider" style={{ color: "#bf5fff" }}>НОВЫЙ КОНТАКТ</h3>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Добавить по имени или публичному ключу</p>
            <input
              autoFocus
              value={newContactName}
              onChange={e => setNewContactName(e.target.value)}
              placeholder="Псевдоним..."
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-2"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(191,95,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            />
            <input
              value={newContactKey}
              onChange={e => setNewContactKey(e.target.value)}
              onKeyDown={e => e.key === "Enter" && createContact()}
              placeholder="Публичный ключ (опционально)..."
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-3 font-mono"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(191,95,255,0.15)", color: "rgba(0,245,255,0.6)", fontSize: "11px" }}
            />
            <div className="flex gap-2">
              <button onClick={() => setShowNewContact(false)} className="flex-1 py-2.5 rounded-xl text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                Отмена
              </button>
              <button onClick={createContact} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(191,95,255,0.15)", color: "#bf5fff", border: "1px solid rgba(191,95,255,0.25)" }}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === МОДАЛКА: Новая группа === */}
      {showNewGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
          <div className="w-80 rounded-2xl p-6 animate-scale-in" style={{ background: "#0d1117", border: "1px solid rgba(57,255,20,0.2)" }}>
            <h3 className="font-display text-lg font-semibold mb-1 tracking-wider" style={{ color: "#39ff14" }}>НОВАЯ ГРУППА</h3>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Зашифрованная группа с E2E</p>
            <input
              autoFocus
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && createGroup()}
              placeholder="Название группы..."
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-3"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(57,255,20,0.15)", color: "rgba(255,255,255,0.85)" }}
            />
            <div className="flex gap-2">
              <button onClick={() => setShowNewGroup(false)} className="flex-1 py-2.5 rounded-xl text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                Отмена
              </button>
              <button onClick={createGroup} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(57,255,20,0.12)", color: "#39ff14", border: "1px solid rgba(57,255,20,0.25)" }}>
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === ЛЕВЫЙ НАВБАР === */}
      <nav className="w-16 flex flex-col items-center py-4 gap-1 z-20 relative flex-shrink-0"
        style={{ background: "#060810", borderRight: "1px solid rgba(0,245,255,0.08)" }}>
        <div className="mb-4 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-cyan-500/30">
            <img src={LOGO_URL} alt="CipherTalk" className="w-full h-full object-cover" />
          </div>
        </div>

        {NAV_ITEMS.map((item) => {
          const cnt = unreadCount(item.id);
          return (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: activeSection === item.id ? "rgba(0,245,255,0.12)" : "transparent",
                boxShadow: activeSection === item.id ? "0 0 12px rgba(0,245,255,0.2)" : "none",
              }} title={item.label}>
              <Icon name={item.icon as "Home"} size={18}
                style={{ color: activeSection === item.id ? "#00f5ff" : "rgba(255,255,255,0.35)" }} />
              {cnt > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-black"
                  style={{ background: "#00f5ff" }}>{cnt > 9 ? "9+" : cnt}</span>
              )}
            </button>
          );
        })}

        <div className="mt-auto flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-base cursor-pointer ring-2 ring-cyan-500/20 hover:ring-cyan-500/50 transition-all"
            style={{ background: "rgba(0,245,255,0.08)" }} onClick={() => setActiveSection("profile")}>
            🕶️
          </div>
          <div className="w-2 h-2 rounded-full" style={{ background: "#39ff14", boxShadow: "0 0 6px #39ff14" }} />
        </div>
      </nav>

      {/* === САЙДБАР === */}
      <aside className="w-72 flex flex-col z-10 relative flex-shrink-0"
        style={{ background: "#080b12", borderRight: "1px solid rgba(0,245,255,0.06)" }}>
        <div className="px-4 pt-5 pb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-display font-semibold text-white text-base tracking-wider uppercase">
                {NAV_ITEMS.find(n => n.id === activeSection)?.label}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#39ff14" }} />
                <span className="text-[11px]" style={{ color: "rgba(0,245,255,0.6)" }}>E2E · защищено</span>
              </div>
            </div>
            {hasPlusSection && (
              <button onClick={plusAction}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: "rgba(0,245,255,0.1)", color: "#00f5ff" }}>
                <Icon name="Plus" size={14} />
              </button>
            )}
            {activeSection === "notifications" && notifications.some(n => !n.read) && (
              <button onClick={markAllRead}
                className="text-[10px] px-2 py-1 rounded-lg transition-all hover:opacity-80"
                style={{ background: "rgba(0,245,255,0.08)", color: "rgba(0,245,255,0.7)" }}>
                Прочитать все
              </button>
            )}
          </div>

          {/* Поиск в сайдбаре */}
          {["chats", "contacts"].includes(activeSection) && (
            <div className="relative">
              <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(0,245,255,0.4)" }} />
              <input value={listSearch} onChange={e => setListSearch(e.target.value)}
                placeholder="Найти..." className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,245,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: "12px" }} />
            </div>
          )}
        </div>

        {/* Список */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">

          {/* ЧАТЫ */}
          {activeSection === "chats" && filteredChats.map((chat) => (
            <button key={chat.id} onClick={() => setActiveChat(chat.id)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left animate-fade-in"
              style={{
                background: activeChat === chat.id ? "rgba(0,245,255,0.08)" : "transparent",
                borderLeft: activeChat === chat.id ? "2px solid #00f5ff" : "2px solid transparent",
              }}>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "rgba(0,245,255,0.08)" }}>{chat.avatar}</div>
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
                  <Icon name="Lock" size={10} style={{ color: "#00f5ff", flexShrink: 0 }} />
                  {chat.selfDestruct && <Icon name="Timer" size={10} style={{ color: "#ff6b35", flexShrink: 0 }} />}
                  <span className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{chat.msg}</span>
                </div>
              </div>
              {chat.unread > 0 && (
                <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-black flex-shrink-0"
                  style={{ background: "#00f5ff" }}>{chat.unread}</span>
              )}
            </button>
          ))}

          {/* КОНТАКТЫ */}
          {activeSection === "contacts" && filteredContacts.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all animate-fade-in group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: "rgba(0,245,255,0.07)" }}>{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.85)" }}>{c.name}</span>
                  {c.trusted && <Icon name="ShieldCheck" size={11} style={{ color: "#00f5ff" }} />}
                </div>
                <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{c.status}</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => trustContact(c.id)}
                  className="w-6 h-6 rounded flex items-center justify-center transition-all"
                  style={{ background: c.trusted ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.05)", color: c.trusted ? "#00f5ff" : "rgba(255,255,255,0.3)" }}
                  title={c.trusted ? "Убрать доверие" : "Доверять"}>
                  <Icon name="Shield" size={11} />
                </button>
                <button onClick={() => deleteContact(c.id)}
                  className="w-6 h-6 rounded flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,45,120,0.1)", color: "#ff2d78" }} title="Удалить">
                  <Icon name="X" size={11} />
                </button>
              </div>
            </div>
          ))}

          {/* ГРУППЫ */}
          {activeSection === "groups" && groups.map((g) => (
            <div key={g.id} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all animate-fade-in cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: "rgba(191,95,255,0.1)" }}>{g.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.85)" }}>{g.name}</span>
                  <Icon name="Lock" size={11} style={{ color: "#bf5fff" }} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{g.members} уч. ·</span>
                  <span className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.25)" }}>{g.msg}</span>
                </div>
              </div>
            </div>
          ))}

          {/* ЗВОНКИ */}
          {activeSection === "calls" && INIT_CALLS.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all animate-fade-in">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: "rgba(0,245,255,0.07)" }}>{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium block" style={{ color: "rgba(255,255,255,0.85)" }}>{c.name}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon
                    name={c.type === "incoming" ? "PhoneIncoming" : c.type === "missed" ? "PhoneMissed" : "PhoneOutgoing" as "Home"}
                    size={11}
                    style={{ color: c.type === "missed" ? "#ff2d78" : c.type === "incoming" ? "#39ff14" : "rgba(0,245,255,0.7)" }}
                  />
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{c.time}{c.duration ? ` · ${c.duration}` : ""}</span>
                </div>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: "rgba(57,255,20,0.1)", color: "#39ff14" }}>
                <Icon name="Phone" size={14} />
              </button>
            </div>
          ))}

          {/* УВЕДОМЛЕНИЯ */}
          {activeSection === "notifications" && notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all animate-fade-in group"
              style={{ opacity: n.read ? 0.6 : 1 }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(0,245,255,0.07)" }}>
                <Icon name={n.icon as "Home"} size={14} className={n.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{n.text}</p>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>{n.time}</span>
              </div>
              <button onClick={() => deleteNotification(n.id)}
                className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0"
                style={{ color: "rgba(255,255,255,0.3)" }}>
                <Icon name="X" size={11} />
              </button>
            </div>
          ))}

          {activeSection === "notifications" && notifications.length === 0 && (
            <div className="py-8 text-center">
              <Icon name="BellOff" size={28} className="mx-auto mb-2 opacity-20" style={{ color: "#00f5ff" }} />
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Нет уведомлений</p>
            </div>
          )}

          {/* ПОИСК */}
          {activeSection === "search" && (
            <div className="px-2 animate-fade-in">
              {searchResults.map((r, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                    style={{ background: "rgba(0,245,255,0.07)" }}>{r.avatar}</div>
                  <div>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{r.name}</span>
                    <span className="text-[10px] block" style={{ color: "rgba(0,245,255,0.5)" }}>{r.type}</span>
                  </div>
                </div>
              ))}
              {searchQuery && searchResults.length === 0 && (
                <p className="text-center py-6 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Ничего не найдено</p>
              )}
            </div>
          )}

          {/* ПРОФИЛЬ */}
          {activeSection === "profile" && (
            <div className="px-3 py-4 animate-fade-in space-y-2">
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3"
                  style={{ background: "rgba(0,245,255,0.08)", boxShadow: "0 0 20px rgba(0,245,255,0.1)" }}>🕶️</div>
                {editingProfile ? (
                  <input
                    autoFocus
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    onBlur={() => setEditingProfile(false)}
                    onKeyDown={e => e.key === "Enter" && setEditingProfile(false)}
                    className="text-sm font-semibold text-center bg-transparent outline-none border-b"
                    style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(0,245,255,0.3)", width: "140px" }}
                  />
                ) : (
                  <button onClick={() => setEditingProfile(true)} className="flex items-center gap-1.5 group">
                    <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{profileName}</span>
                    <Icon name="Pencil" size={11} style={{ color: "rgba(0,245,255,0.4)" }} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                )}
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(0,245,255,0.6)" }}>Анонимный режим активен</p>
              </div>
              {[{ label: "ID пользователя", val: "#CT-48291" }, { label: "Публичный ключ", val: "4A7F...9E2B" }, { label: "Статус", val: "В сети" }].map(item => (
                <div key={item.label} className="flex justify-between px-3 py-2.5 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,245,255,0.06)" }}>
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{item.label}</span>
                  <span className="text-[11px] font-medium font-mono" style={{ color: "rgba(0,245,255,0.8)" }}>{item.val}</span>
                </div>
              ))}
              <button className="w-full mt-2 py-2.5 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                style={{ background: "rgba(255,45,120,0.1)", color: "#ff2d78", border: "1px solid rgba(255,45,120,0.15)" }}>
                Сбросить идентификатор
              </button>
            </div>
          )}

          {/* НАСТРОЙКИ */}
          {activeSection === "settings" && (
            <div className="px-3 py-3 animate-fade-in space-y-1">
              {settings.map(item => (
                <div key={item.key} className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.03)" }}>
                  <Icon name={item.icon as "Home"} size={14} style={{ color: item.color }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] block" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>{item.desc}</span>
                  </div>
                  {/* Переключатель */}
                  <button onClick={() => toggleSetting(item.key)}
                    className="relative w-9 h-5 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{ background: item.enabled ? `${item.color}30` : "rgba(255,255,255,0.08)", border: `1px solid ${item.enabled ? item.color + "60" : "rgba(255,255,255,0.1)"}` }}>
                    <div className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300"
                      style={{ background: item.enabled ? item.color : "rgba(255,255,255,0.3)", left: item.enabled ? "calc(100% - 18px)" : "2px", boxShadow: item.enabled ? `0 0 8px ${item.color}80` : "none" }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* === ГЛАВНАЯ ЗОНА === */}
      <main className="flex-1 flex flex-col min-w-0 relative">

        {activeSection === "chats" ? (
          <>
            {/* Шапка чата */}
            <header className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0"
              style={{ background: "rgba(8,11,18,0.97)", borderBottom: "1px solid rgba(0,245,255,0.06)", backdropFilter: "blur(10px)" }}>
              {currentChat ? (
                <>
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl"
                      style={{ background: "rgba(0,245,255,0.08)" }}>{currentChat.avatar}</div>
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
                </>
              ) : (
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Выберите чат</span>
              )}
            </header>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
              style={{ background: "linear-gradient(180deg, #080b12 0%, #060810 100%)" }}>
              <div className="flex justify-center my-2">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.12)" }}>
                  <Icon name="ShieldCheck" size={11} style={{ color: "#00f5ff" }} />
                  <span className="text-[11px]" style={{ color: "rgba(0,245,255,0.7)" }}>
                    Сообщения зашифрованы · Signal Protocol
                  </span>
                </div>
              </div>

              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"} animate-fade-in`}>
                  <div className="max-w-xs lg:max-w-md">
                    <div className="px-4 py-2.5 relative"
                      style={{
                        background: msg.mine ? "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,245,255,0.08))" : "rgba(255,255,255,0.05)",
                        border: msg.mine ? "1px solid rgba(0,245,255,0.2)" : "1px solid rgba(255,255,255,0.06)",
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
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода */}
            <div className="px-4 py-3 flex-shrink-0"
              style={{ background: "rgba(8,11,18,0.97)", borderTop: "1px solid rgba(0,245,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>
                  <Icon name="Paperclip" size={16} />
                </button>
                <input
                  value={msgInput}
                  onChange={e => setMsgInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Зашифрованное сообщение..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0,245,255,0.1)",
                    color: "rgba(255,255,255,0.8)",
                  }}
                />
                <button
                  onClick={() => setSelfDestructMode(p => !p)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  title="Самоудаляющееся сообщение"
                  style={{
                    background: selfDestructMode ? "rgba(255,107,53,0.2)" : "rgba(255,107,53,0.08)",
                    color: selfDestructMode ? "#ff6b35" : "rgba(255,107,53,0.4)",
                    border: selfDestructMode ? "1px solid rgba(255,107,53,0.4)" : "1px solid transparent",
                  }}>
                  <Icon name="Timer" size={15} />
                </button>
                <button onClick={sendMessage}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: msgInput.trim() ? "rgba(0,245,255,0.2)" : "rgba(255,255,255,0.04)",
                    color: msgInput.trim() ? "#00f5ff" : "rgba(255,255,255,0.2)",
                    boxShadow: msgInput.trim() ? "0 0 12px rgba(0,245,255,0.2)" : "none",
                  }}>
                  <Icon name="Send" size={15} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#39ff14" }} />
                <span className="text-[10px]" style={{ color: "rgba(0,245,255,0.4)" }}>
                  AES-256 · {selfDestructMode ? "🔥 Авто-удаление включено" : "Ключ обновлён 2 мин назад"}
                </span>
              </div>
            </div>
          </>
        ) : activeSection === "search" ? (
          /* ПОИСК — основная область */
          <div className="flex-1 flex flex-col" style={{ background: "#060810" }}>
            <div className="px-8 pt-10 pb-6">
              <h2 className="font-display text-xl font-semibold tracking-widest mb-1" style={{ color: "#00f5ff" }}>ПОИСК</h2>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>Поиск по чатам, контактам и группам</p>
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(0,245,255,0.5)" }} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Начните вводить..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0,245,255,0.15)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
            {searchResults.length > 0 && (
              <div className="px-6 space-y-1 animate-fade-in">
                {searchResults.map((r, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                      style={{ background: "rgba(0,245,255,0.07)" }}>{r.avatar}</div>
                    <div>
                      <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{r.name}</span>
                      <span className="text-[11px] block" style={{ color: "rgba(0,245,255,0.5)" }}>{r.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!searchQuery && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Search" size={36} className="mx-auto mb-3" style={{ color: "rgba(0,245,255,0.1)" }} />
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.15)" }}>Введите запрос для поиска</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Заглушка для других разделов */
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
