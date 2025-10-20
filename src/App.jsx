import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Eye, EyeOff, TrendingUp, User, History, DollarSign, LogOut, ArrowLeft, AlertCircle, CheckCircle, TrendingDown, Calendar } from 'lucide-react'
import './App.css'

// ===== BASES DE DADOS SIMULADAS =====

// Teste vulnerabilidade
const databasePassword = "MySuperSecretPassword123!";

// Base de dados de usuários
let usuarios_base = [
  {
    id: 1,
    nomeCompleto: "João Silva Santos",
    idade: 28,
    banco: "banco-do-brasil",
    endereco: "Rua das Flores, 123, São Paulo - SP",
    email: "joao.silva@email.com",
    senha: "123456",
    dataCadastro: "2024-01-10"
  },
  {
    id: 2,
    nomeCompleto: "Maria Oliveira Costa",
    idade: 35,
    banco: "santander",
    endereco: "Av. Paulista, 456, São Paulo - SP",
    email: "maria.oliveira@email.com",
    senha: "senha123",
    dataCadastro: "2024-02-15"
  }
]

// Base de dados de investimentos disponíveis
const investimentos_base = [
  // Investimentos de BAIXO RISCO
  {
    id: 1,
    nome: "Tesouro Selic 2029",
    valorMinimo: 100,
    rendimentoAtual: 12.5,
    risco: "baixo"
  },
  {
    id: 2,
    nome: "CDB Banco Inter",
    valorMinimo: 500,
    rendimentoAtual: 13.2,
    risco: "baixo"
  },
  {
    id: 3,
    nome: "LCI Santander",
    valorMinimo: 1000,
    rendimentoAtual: 11.8,
    risco: "baixo"
  },
  {
    id: 4,
    nome: "Tesouro IPCA+ 2035",
    valorMinimo: 100,
    rendimentoAtual: 6.2,
    risco: "baixo"
  },
  // Investimentos de MÉDIO RISCO
  {
    id: 5,
    nome: "Fundo Multimercado XP",
    valorMinimo: 1000,
    rendimentoAtual: 15.7,
    risco: "médio"
  },
  {
    id: 6,
    nome: "Fundo Imobiliário HGLG11",
    valorMinimo: 150,
    rendimentoAtual: 9.2,
    risco: "médio"
  },
  {
    id: 7,
    nome: "Debênture Infraestrutura",
    valorMinimo: 2000,
    rendimentoAtual: 14.1,
    risco: "médio"
  },
  // Investimentos de ALTO RISCO
  {
    id: 8,
    nome: "Ações Petrobras (PETR4)",
    valorMinimo: 200,
    rendimentoAtual: 18.3,
    risco: "alto"
  },
  {
    id: 9,
    nome: "Bitcoin ETF",
    valorMinimo: 50,
    rendimentoAtual: 25.8,
    risco: "alto"
  },
  {
    id: 10,
    nome: "Ações Magazine Luiza (MGLU3)",
    valorMinimo: 100,
    rendimentoAtual: 22.1,
    risco: "alto"
  }
]

// Base de dados de investimentos do usuário (por email)
let investimentos_usuario = [
  // Investimentos do usuário joao.silva@email.com
  {
    id: 1,
    emailUsuario: "joao.silva@email.com",
    nomeInvestimento: "Tesouro Selic 2029",
    risco: "baixo",
    valorInvestido: 1000,
    ganhos: 125.50,
    perdas: 0,
    dataPrimeiroInvestimento: "2024-01-15"
  },
  {
    id: 2,
    emailUsuario: "joao.silva@email.com",
    nomeInvestimento: "CDB Banco Inter",
    risco: "baixo",
    valorInvestido: 2000,
    ganhos: 264.00,
    perdas: 0,
    dataPrimeiroInvestimento: "2024-02-20"
  },
  {
    id: 3,
    emailUsuario: "joao.silva@email.com",
    nomeInvestimento: "Ações Petrobras (PETR4)",
    risco: "alto",
    valorInvestido: 500,
    ganhos: 91.50,
    perdas: 0,
    dataPrimeiroInvestimento: "2024-03-10"
  },
  {
    id: 4,
    emailUsuario: "joao.silva@email.com",
    nomeInvestimento: "Fundo Imobiliário HGLG11",
    risco: "médio",
    valorInvestido: 800,
    ganhos: 73.60,
    perdas: 0,
    dataPrimeiroInvestimento: "2024-04-05"
  },
  {
    id: 5,
    emailUsuario: "joao.silva@email.com",
    nomeInvestimento: "Bitcoin ETF",
    risco: "alto",
    valorInvestido: 300,
    ganhos: 77.40,
    perdas: 0,
    dataPrimeiroInvestimento: "2024-05-12"
  },
  {
    id: 6,
    emailUsuario: "joao.silva@email.com",
    nomeInvestimento: "Ações Magazine Luiza (MGLU3)",
    risco: "alto",
    valorInvestido: 600,
    ganhos: 0,
    perdas: 67.20,
    dataPrimeiroInvestimento: "2024-06-01"
  },
  // Investimentos do usuário maria.oliveira@email.com
  {
    id: 7,
    emailUsuario: "maria.oliveira@email.com",
    nomeInvestimento: "Tesouro IPCA+ 2035",
    risco: "baixo",
    valorInvestido: 1500,
    ganhos: 93.00,
    perdas: 0,
    dataPrimeiroInvestimento: "2024-03-01"
  },
  {
    id: 8,
    emailUsuario: "maria.oliveira@email.com",
    nomeInvestimento: "Fundo Multimercado XP",
    risco: "médio",
    valorInvestido: 3000,
    ganhos: 471.00,
    perdas: 0,
    dataPrimeiroInvestimento: "2024-04-15"
  }
]

function App() {
  const [currentScreen, setCurrentScreen] = useState('auth') // 'auth', 'main', 'investir', 'historico'
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nomeCompleto: '',
    idade: '',
    banco: '',
    endereco: ''
  })

  // Estados para a tela de investir
  const [valorBusca, setValorBusca] = useState('')
  const [investimentosFiltrados, setInvestimentosFiltrados] = useState([])
  const [investimentoSelecionado, setInvestimentoSelecionado] = useState(null)
  const [valorInvestimento, setValorInvestimento] = useState('')
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  // ===== FUNÇÕES DE MANIPULAÇÃO DE DADOS =====

  // Função para buscar usuário por email
  const buscarUsuarioPorEmail = (email) => {
    return usuarios_base.find(usuario => usuario.email === email)
  }

  // Função para adicionar novo usuário
  const adicionarUsuario = (dadosUsuario) => {
    const novoId = usuarios_base.length > 0 ? Math.max(...usuarios_base.map(u => u.id)) + 1 : 1
    const novoUsuario = {
      id: novoId,
      ...dadosUsuario,
      dataCadastro: new Date().toISOString().split('T')[0]
    }
    usuarios_base.push(novoUsuario)
    return novoUsuario
  }

  // Função para buscar investimentos do usuário por email
  const buscarInvestimentosUsuario = (email) => {
    return investimentos_usuario.filter(inv => inv.emailUsuario === email)
  }

  // Função para adicionar investimento do usuário
  const adicionarInvestimentoUsuario = (emailUsuario, investimento, valorInvestido) => {
    const novoId = investimentos_usuario.length > 0 ? Math.max(...investimentos_usuario.map(i => i.id)) + 1 : 1
    const novoInvestimento = {
      id: novoId,
      emailUsuario: emailUsuario,
      nomeInvestimento: investimento.nome,
      risco: investimento.risco,
      valorInvestido: valorInvestido,
      ganhos: 0, // Inicialmente sem ganhos
      perdas: 0, // Inicialmente sem perdas
      dataPrimeiroInvestimento: new Date().toISOString().split('T')[0]
    }
    investimentos_usuario.push(novoInvestimento)
    return novoInvestimento
  }

  // ===== FUNÇÕES DE INTERFACE =====

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      // Verificar se o usuário existe na base de dados
      const usuario = buscarUsuarioPorEmail(formData.email)
      if (usuario && usuario.senha === formData.senha) {
        console.log('Login bem-sucedido:', usuario)
        setUserInfo({
          nome: usuario.nomeCompleto,
          email: usuario.email,
          idade: usuario.idade,
          banco: usuario.banco,
          endereco: usuario.endereco
        })
        setCurrentScreen('main')
      } else {
        alert('Email ou senha incorretos!')
        return
      }
    } else {
      // Verificar se o email já existe
      const usuarioExistente = buscarUsuarioPorEmail(formData.email)
      if (usuarioExistente) {
        alert('Este email já está cadastrado!')
        return
      }
      
      // Adicionar novo usuário
      const novoUsuario = adicionarUsuario(formData)
      console.log('Cadastro realizado:', novoUsuario)
      setUserInfo({
        nome: novoUsuario.nomeCompleto,
        email: novoUsuario.email,
        idade: novoUsuario.idade,
        banco: novoUsuario.banco,
        endereco: novoUsuario.endereco
      })
      setCurrentScreen('main')
    }
  }

  const handleLogout = () => {
    setUserInfo(null)
    setCurrentScreen('auth')
    setFormData({
      email: '',
      senha: '',
      nomeCompleto: '',
      idade: '',
      banco: '',
      endereco: ''
    })
    resetInvestirState()
  }

  const resetInvestirState = () => {
    setValorBusca('')
    setInvestimentosFiltrados([])
    setInvestimentoSelecionado(null)
    setValorInvestimento('')
    setMostrarOpcoes(false)
    setErro('')
    setSucesso('')
  }

  const handleNavigation = (destination) => {
    console.log(`Navegando para: ${destination}`)
    if (destination === 'Investir') {
      resetInvestirState()
      setCurrentScreen('investir')
    } else if (destination === 'Histórico de Investimentos') {
      setCurrentScreen('historico')
    } else {
      alert(`Funcionalidade "${destination}" será implementada na próxima etapa!`)
    }
  }

  const buscarInvestimentos = () => {
    const valor = parseFloat(valorBusca)
    if (!valor || valor <= 0) {
      setErro('Por favor, insira um valor válido maior que zero.')
      return
    }

    const filtrados = investimentos_base.filter(inv => inv.valorMinimo <= valor)
    setInvestimentosFiltrados(filtrados)
    setMostrarOpcoes(true)
    setErro('')
    
    if (filtrados.length === 0) {
      setErro('Nenhum investimento encontrado para este valor. Tente um valor maior.')
    }
  }

  const selecionarInvestimento = (investimento) => {
    setInvestimentoSelecionado(investimento)
    setValorInvestimento(investimento.valorMinimo.toString())
    setErro('')
  }

  const confirmarInvestimento = () => {
    const valor = parseFloat(valorInvestimento)
    
    if (!valor || valor < investimentoSelecionado.valorMinimo) {
      setErro(`O valor mínimo para este investimento é R$ ${investimentoSelecionado.valorMinimo.toLocaleString('pt-BR')}.`)
      return
    }

    // Adicionar investimento à base de dados do usuário
    const novoInvestimento = adicionarInvestimentoUsuario(userInfo.email, investimentoSelecionado, valor)
    console.log('Novo investimento adicionado:', novoInvestimento)

    // Simular investimento bem-sucedido
    setSucesso(`Investimento de R$ ${valor.toLocaleString('pt-BR')} em "${investimentoSelecionado.nome}" realizado com sucesso!`)
    setErro('')
    
    // Voltar para a tela principal após 2 segundos
    setTimeout(() => {
      setCurrentScreen('main')
      resetInvestirState()
    }, 2000)
  }

  const getRiscoColor = (risco) => {
    switch (risco) {
      case 'baixo': return 'bg-green-100 text-green-800'
      case 'médio': return 'bg-yellow-100 text-yellow-800'
      case 'alto': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiscoLabel = (risco) => {
    switch (risco) {
      case 'baixo': return 'Baixo'
      case 'médio': return 'Médio'
      case 'alto': return 'Alto'
      default: return 'N/A'
    }
  }

  const formatarData = (dataString) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR')
  }

  const calcularRendimentoPercentual = (valorInvestido, valorAtual) => {
    return ((valorAtual - valorInvestido) / valorInvestido * 100)
  }

  const getRendimentoColor = (rendimento) => {
    return rendimento >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getRendimentoIcon = (rendimento) => {
    return rendimento >= 0 ? TrendingUp : TrendingDown
  }

  // ===== RENDERIZAÇÃO DAS TELAS =====

  // Tela de Login/Cadastro
  if (currentScreen === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFC709] via-[#FFD700] to-[#FFA500] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#121212] rounded-full mb-4 hover-lift">
              <TrendingUp className="w-8 h-8 text-[#FFC709]" />
            </div>
            <h1 className="text-3xl font-bold text-[#121212] mb-2">InvestSmart</h1>
            <p className="text-[#121212]/80">Sua plataforma de investimentos inteligentes</p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover-lift">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-[#121212]">
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {isLogin 
                  ? 'Acesse sua conta para continuar' 
                  : 'Preencha seus dados para começar'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="nomeCompleto" className="text-[#121212] font-medium">
                        Nome Completo
                      </Label>
                      <Input
                        id="nomeCompleto"
                        type="text"
                        placeholder="Digite seu nome completo"
                        value={formData.nomeCompleto}
                        onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                        className="border-gray-300 focus:border-[#FFC709] focus:ring-[#FFC709]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idade" className="text-[#121212] font-medium">
                        Idade
                      </Label>
                      <Input
                        id="idade"
                        type="number"
                        placeholder="Digite sua idade"
                        value={formData.idade}
                        onChange={(e) => handleInputChange('idade', e.target.value)}
                        className="border-gray-300 focus:border-[#FFC709] focus:ring-[#FFC709]"
                        min="18"
                        max="100"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="banco" className="text-[#121212] font-medium">
                        Banco
                      </Label>
                      <Select onValueChange={(value) => handleInputChange('banco', value)} required>
                        <SelectTrigger className="border-gray-300 focus:border-[#FFC709] focus:ring-[#FFC709]">
                          <SelectValue placeholder="Selecione seu banco" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="banco-do-brasil">Banco do Brasil</SelectItem>
                          <SelectItem value="santander">Santander</SelectItem>
                          <SelectItem value="itau">Itaú</SelectItem>
                          <SelectItem value="bradesco">Bradesco</SelectItem>
                          <SelectItem value="caixa">Caixa Econômica Federal</SelectItem>
                          <SelectItem value="nubank">Nubank</SelectItem>
                          <SelectItem value="inter">Banco Inter</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endereco" className="text-[#121212] font-medium">
                        Endereço
                      </Label>
                      <Input
                        id="endereco"
                        type="text"
                        placeholder="Digite seu endereço completo"
                        value={formData.endereco}
                        onChange={(e) => handleInputChange('endereco', e.target.value)}
                        className="border-gray-300 focus:border-[#FFC709] focus:ring-[#FFC709]"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#121212] font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-gray-300 focus:border-[#FFC709] focus:ring-[#FFC709]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha" className="text-[#121212] font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="senha"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={formData.senha}
                      onChange={(e) => handleInputChange('senha', e.target.value)}
                      className="border-gray-300 focus:border-[#FFC709] focus:ring-[#FFC709] pr-10"
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#121212]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#121212] hover:bg-[#121212]/90 text-white font-medium py-2.5 transition-all duration-200 hover:shadow-lg hover-lift"
                >
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-[#121212] font-medium hover:underline transition-all duration-200"
                  >
                    {isLogin ? 'Cadastre-se' : 'Faça login'}
                  </button>
                </p>
              </div>

              {isLogin && (
                <div className="mt-4 text-center">
                  <button className="text-sm text-gray-500 hover:text-[#121212] transition-all duration-200">
                    Esqueceu sua senha?
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-[#121212]/70">
            <p>Ao continuar, você concorda com nossos</p>
            <p>
              <button className="underline hover:text-[#121212]">Termos de Uso</button>
              {' e '}
              <button className="underline hover:text-[#121212]">Política de Privacidade</button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Tela de Histórico de Investimentos
  if (currentScreen === 'historico') {
    const investimentosDoUsuario = buscarInvestimentosUsuario(userInfo.email)
    const totalInvestido = investimentosDoUsuario.reduce((acc, inv) => acc + inv.valorInvestido, 0)
    const totalGanhos = investimentosDoUsuario.reduce((acc, inv) => acc + inv.ganhos, 0)
    const totalPerdas = investimentosDoUsuario.reduce((acc, inv) => acc + inv.perdas, 0)
    const totalAtual = totalInvestido + totalGanhos - totalPerdas
    const rendimentoTotal = totalGanhos - totalPerdas
    const rendimentoPercentualTotal = totalInvestido > 0 ? (rendimentoTotal / totalInvestido) * 100 : 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFC709] via-[#FFD700] to-[#FFA500]">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setCurrentScreen('main')}
              variant="outline"
              size="sm"
              className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30 hover-lift"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[#121212]">Histórico de Investimentos</h1>
              <p className="text-[#121212]/70 text-sm">Acompanhe a performance dos seus investimentos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => handleNavigation('Perfil do Usuário')}
              variant="outline"
              size="sm"
              className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30 hover-lift"
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30 hover-lift"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Resumo do Portfólio */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Investido</p>
                      <p className="text-2xl font-bold text-[#121212]">
                        R$ {totalInvestido.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Valor Atual</p>
                      <p className="text-2xl font-bold text-[#121212]">
                        R$ {totalAtual.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Rendimento Total</p>
                      <p className={`text-2xl font-bold ${getRendimentoColor(rendimentoTotal)}`}>
                        {rendimentoTotal >= 0 ? '+' : ''}R$ {rendimentoTotal.toLocaleString('pt-BR')}
                      </p>
                      <p className={`text-sm ${getRendimentoColor(rendimentoTotal)}`}>
                        {rendimentoPercentualTotal >= 0 ? '+' : ''}{rendimentoPercentualTotal.toFixed(2)}%
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      rendimentoTotal >= 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {rendimentoTotal >= 0 ? 
                        <TrendingUp className="w-6 h-6 text-green-600" /> : 
                        <TrendingDown className="w-6 h-6 text-red-600" />
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Investimentos */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-[#121212] flex items-center">
                  <History className="w-6 h-6 mr-3" />
                  Seus Investimentos
                </CardTitle>
                <CardDescription>
                  Histórico completo dos seus investimentos e performance atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investimentosDoUsuario.map((investimento) => {
                    const valorAtual = investimento.valorInvestido + investimento.ganhos - investimento.perdas
                    const rendimentoValor = investimento.ganhos - investimento.perdas
                    const rendimentoPercentual = (rendimentoValor / investimento.valorInvestido) * 100
                    const RendimentoIcon = getRendimentoIcon(rendimentoValor)
                    
                    return (
                      <Card key={investimento.id} className="border border-gray-200 hover:shadow-md transition-all duration-200">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-[#121212] mb-2">
                                {investimento.nomeInvestimento}
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600 flex items-center mb-1">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Data do Investimento:
                                  </span>
                                  <p className="font-semibold text-[#121212]">
                                    {formatarData(investimento.dataPrimeiroInvestimento)}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Risco:</span>
                                  <Badge className={`${getRiscoColor(investimento.risco)} mt-1`}>
                                    {getRiscoLabel(investimento.risco)}
                                  </Badge>
                                </div>
                                <div>
                                  <span className="text-gray-600">Valor Investido:</span>
                                  <p className="font-semibold text-[#121212]">
                                    R$ {investimento.valorInvestido.toLocaleString('pt-BR')}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Valor Atual:</span>
                                  <p className="font-semibold text-[#121212]">
                                    R$ {valorAtual.toLocaleString('pt-BR')}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Rendimento:</span>
                                  <div className="flex items-center space-x-1">
                                    <RendimentoIcon className={`w-4 h-4 ${getRendimentoColor(rendimentoValor)}`} />
                                    <div>
                                      <p className={`font-semibold ${getRendimentoColor(rendimentoValor)}`}>
                                        {rendimentoValor >= 0 ? '+' : ''}R$ {rendimentoValor.toLocaleString('pt-BR')}
                                      </p>
                                      <p className={`text-xs ${getRendimentoColor(rendimentoValor)}`}>
                                        {rendimentoPercentual >= 0 ? '+' : ''}{rendimentoPercentual.toFixed(2)}%
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {investimentosDoUsuario.length === 0 && (
                  <div className="text-center py-12">
                    <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Nenhum investimento encontrado
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Você ainda não fez nenhum investimento. Que tal começar agora?
                    </p>
                    <Button 
                      onClick={() => handleNavigation('Investir')}
                      className="bg-[#121212] hover:bg-[#121212]/90 text-white"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Fazer Primeiro Investimento
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Tela de Investir
  if (currentScreen === 'investir') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFC709] via-[#FFD700] to-[#FFA500]">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setCurrentScreen('main')}
              variant="outline"
              size="sm"
              className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30 hover-lift"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[#121212]">Investir</h1>
              <p className="text-[#121212]/70 text-sm">Encontre o investimento ideal para você</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => handleNavigation('Perfil do Usuário')}
              variant="outline"
              size="sm"
              className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30 hover-lift"
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30 hover-lift"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Busca por valor */}
            {!mostrarOpcoes && (
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#121212]">
                    Quanto você gostaria de investir?
                  </CardTitle>
                  <CardDescription>
                    Digite o valor que você tem disponível para investimento e encontraremos as melhores opções para você.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="valorBusca" className="text-[#121212] font-medium">
                        Valor disponível (R$)
                      </Label>
                      <Input
                        id="valorBusca"
                        type="number"
                        placeholder="Ex: 1000"
                        value={valorBusca}
                        onChange={(e) => setValorBusca(e.target.value)}
                        className="border-gray-300 focus:border-[#FFC709] focus:ring-[#FFC709]"
                        min="1"
                        step="0.01"
                      />
                    </div>
                    
                    {erro && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{erro}</span>
                      </div>
                    )}

                    <Button 
                      onClick={buscarInvestimentos}
                      className="w-full bg-[#121212] hover:bg-[#121212]/90 text-white font-medium py-2.5 transition-all duration-200 hover:shadow-lg hover-lift"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Buscar Investimentos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista de investimentos */}
            {mostrarOpcoes && !investimentoSelecionado && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#121212]">
                    Investimentos disponíveis para R$ {parseFloat(valorBusca).toLocaleString('pt-BR')}
                  </h2>
                  <Button
                    onClick={() => setMostrarOpcoes(false)}
                    variant="outline"
                    size="sm"
                    className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30"
                  >
                    Nova Busca
                  </Button>
                </div>

                {erro && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{erro}</span>
                  </div>
                )}

                <div className="grid gap-4">
                  {investimentosFiltrados.map((investimento) => (
                    <Card 
                      key={investimento.id}
                      className="bg-white/95 backdrop-blur-sm shadow-xl border-0 hover-lift cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => selecionarInvestimento(investimento)}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#121212] mb-2">
                              {investimento.nome}
                            </h3>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Valor Mínimo:</span>
                                <p className="font-semibold text-[#121212]">
                                  R$ {investimento.valorMinimo.toLocaleString('pt-BR')}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Rendimento:</span>
                                <p className="font-semibold text-green-600">
                                  {investimento.rendimentoAtual}% a.a.
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Risco:</span>
                                <Badge className={`${getRiscoColor(investimento.risco)} mt-1`}>
                                  {getRiscoLabel(investimento.risco)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-[#121212]/70">Clique para investir →</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmação de investimento */}
            {investimentoSelecionado && (
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#121212]">
                    Confirmar Investimento
                  </CardTitle>
                  <CardDescription>
                    Você selecionou: {investimentoSelecionado.nome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Detalhes do investimento */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#121212] mb-3">Detalhes do Investimento:</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Valor Mínimo:</span>
                          <p className="font-semibold text-[#121212]">
                            R$ {investimentoSelecionado.valorMinimo.toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Rendimento:</span>
                          <p className="font-semibold text-green-600">
                            {investimentoSelecionado.rendimentoAtual}% a.a.
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Risco:</span>
                          <Badge className={`${getRiscoColor(investimentoSelecionado.risco)} mt-1`}>
                            {getRiscoLabel(investimentoSelecionado.risco)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Valor a investir */}
                    <div className="space-y-2">
                      <Label htmlFor="valorInvestimento" className="text-[#121212] font-medium">
                        Valor a investir (R$)
                      </Label>
                      <Input
                        id="valorInvestimento"
                        type="number"
                        placeholder={`Mínimo: R$ ${investimentoSelecionado.valorMinimo}`}
                        value={valorInvestimento}
                        onChange={(e) => setValorInvestimento(e.target.value)}
                        className="border-gray-300 focus:border-[#FFC709] focus:ring-[#FFC709]"
                        min={investimentoSelecionado.valorMinimo}
                        step="0.01"
                      />
                    </div>

                    {erro && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{erro}</span>
                      </div>
                    )}

                    {sucesso && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">{sucesso}</span>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setInvestimentoSelecionado(null)}
                        variant="outline"
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Voltar
                      </Button>
                      <Button 
                        onClick={confirmarInvestimento}
                        className="flex-1 bg-[#121212] hover:bg-[#121212]/90 text-white font-medium transition-all duration-200 hover:shadow-lg hover-lift"
                        disabled={sucesso}
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Confirmar Investimento
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    )
  }

  // Tela Principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFC709] via-[#FFD700] to-[#FFA500]">
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#121212] rounded-full">
            <TrendingUp className="w-6 h-6 text-[#FFC709]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#121212]">InvestSmart</h1>
            <p className="text-[#121212]/70 text-sm">Bem-vindo, {userInfo?.nome || 'Usuário'}!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => handleNavigation('Perfil do Usuário')}
            variant="outline"
            size="sm"
            className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30 hover-lift"
          >
            <User className="w-4 h-4 mr-2" />
            Perfil
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white/20 border-[#121212]/20 text-[#121212] hover:bg-white/30 hover-lift"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-[#121212] mb-4">
              O que você gostaria de fazer hoje?
            </h2>
            <p className="text-[#121212]/80 text-lg">
              Escolha uma das opções abaixo para gerenciar seus investimentos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card 
              className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover-lift cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => handleNavigation('Histórico de Investimentos')}
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#121212] rounded-full mb-6">
                  <History className="w-8 h-8 text-[#FFC709]" />
                </div>
                <h3 className="text-2xl font-bold text-[#121212] mb-3">
                  Histórico de Investimentos
                </h3>
                <p className="text-gray-600 mb-4">
                  Visualize todos os seus investimentos atuais, rendimentos e performance do seu portfólio
                </p>
                <div className="text-sm text-[#121212]/70">
                  Clique para acessar →
                </div>
              </CardContent>
            </Card>

            <Card 
              className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover-lift cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => handleNavigation('Investir')}
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#121212] rounded-full mb-6">
                  <DollarSign className="w-8 h-8 text-[#FFC709]" />
                </div>
                <h3 className="text-2xl font-bold text-[#121212] mb-3">
                  Investir
                </h3>
                <p className="text-gray-600 mb-4">
                  Descubra as melhores oportunidades de investimento personalizadas para o seu perfil
                </p>
                <div className="text-sm text-[#121212]/70">
                  Clique para começar →
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-[#121212] mb-2">
                  💡 Dica do Dia
                </h4>
                <p className="text-gray-600 text-sm">
                  Diversificar seus investimentos é uma das estratégias mais importantes para reduzir riscos e maximizar retornos a longo prazo.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App

