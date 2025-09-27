'use client'

import React, { useState, useMemo } from 'react'
import { 
  Factory, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Wrench, 
  Search, 
  Filter, 
  BarChart3, 
  Users, 
  Zap, 
  Thermometer,
  X,
  Building2,
  Cpu,
  Activity
} from 'lucide-react'

// Types
interface Machine {
  id: string
  name: string
  type: 'CNC' | 'Robot' | 'Presse' | 'Convoyeur' | 'Four'
  status: 'running' | 'idle' | 'maintenance' | 'error'
  efficiency: number
  temperature?: number
  lastMaintenance: string
  departmentId: string
}

interface Department {
  id: string
  name: string
  description: string
  siteId: string
  machines: Machine[]
}

interface Site {
  id: string
  name: string
  location: string
  country: string
  established: string
  departments: Department[]
}

type StatusFilter = 'all' | 'running' | 'idle' | 'maintenance' | 'error'
type MachineTypeFilter = 'all' | 'CNC' | 'Robot' | 'Presse' | 'Convoyeur' | 'Four'
type ViewMode = 'hierarchy' | 'grid' | 'analytics'

// Mock Data - Dataset riche pour impressionner
const mockData: Site[] = [
  {
    id: 'site-1',
    name: 'Usine Montréal Nord',
    location: 'Montréal, QC',
    country: 'Canada',
    established: '1995',
    departments: [
      {
        id: 'dept-1',
        name: 'Production Primaire',
        description: 'Usinage et fabrication des pièces principales',
        siteId: 'site-1',
        machines: [
          {
            id: 'machine-1',
            name: 'CNC-001 Alpha',
            type: 'CNC',
            status: 'running',
            efficiency: 87,
            temperature: 45,
            lastMaintenance: '2024-09-15',
            departmentId: 'dept-1'
          },
          {
            id: 'machine-2',
            name: 'CNC-002 Beta',
            type: 'CNC',
            status: 'maintenance',
            efficiency: 0,
            temperature: 22,
            lastMaintenance: '2024-09-26',
            departmentId: 'dept-1'
          },
          {
            id: 'machine-3',
            name: 'Robot-Assembly-01',
            type: 'Robot',
            status: 'running',
            efficiency: 94,
            lastMaintenance: '2024-09-10',
            departmentId: 'dept-1'
          },
          {
            id: 'machine-4',
            name: 'CNC-003 Gamma',
            type: 'CNC',
            status: 'running',
            efficiency: 78,
            temperature: 42,
            lastMaintenance: '2024-09-20',
            departmentId: 'dept-1'
          }
        ]
      },
      {
        id: 'dept-2',
        name: 'Assemblage Final',
        description: 'Montage et contrôle qualité final',
        siteId: 'site-1',
        machines: [
          {
            id: 'machine-5',
            name: 'Presse-HYD-001',
            type: 'Presse',
            status: 'running',
            efficiency: 76,
            temperature: 38,
            lastMaintenance: '2024-09-20',
            departmentId: 'dept-2'
          },
          {
            id: 'machine-6',
            name: 'Convoyeur-A1',
            type: 'Convoyeur',
            status: 'idle',
            efficiency: 55,
            lastMaintenance: '2024-09-18',
            departmentId: 'dept-2'
          },
          {
            id: 'machine-7',
            name: 'Robot-Pack-01',
            type: 'Robot',
            status: 'running',
            efficiency: 85,
            lastMaintenance: '2024-09-16',
            departmentId: 'dept-2'
          }
        ]
      }
    ]
  },
  {
    id: 'site-2',
    name: 'Usine Laval',
    location: 'Laval, QC',
    country: 'Canada',
    established: '2010',
    departments: [
      {
        id: 'dept-3',
        name: 'Traitement Thermique',
        description: 'Four et traitement des matériaux',
        siteId: 'site-2',
        machines: [
          {
            id: 'machine-8',
            name: 'Four-Industrial-01',
            type: 'Four',
            status: 'running',
            efficiency: 89,
            temperature: 850,
            lastMaintenance: '2024-09-12',
            departmentId: 'dept-3'
          },
          {
            id: 'machine-9',
            name: 'Four-Industrial-02',
            type: 'Four',
            status: 'error',
            efficiency: 0,
            temperature: 25,
            lastMaintenance: '2024-09-08',
            departmentId: 'dept-3'
          },
          {
            id: 'machine-10',
            name: 'Four-Industrial-03',
            type: 'Four',
            status: 'running',
            efficiency: 92,
            temperature: 875,
            lastMaintenance: '2024-09-25',
            departmentId: 'dept-3'
          }
        ]
      },
      {
        id: 'dept-4',
        name: 'Contrôle Qualité',
        description: 'Tests et validation des produits',
        siteId: 'site-2',
        machines: [
          {
            id: 'machine-11',
            name: 'Robot-QC-001',
            type: 'Robot',
            status: 'running',
            efficiency: 92,
            lastMaintenance: '2024-09-14',
            departmentId: 'dept-4'
          },
          {
            id: 'machine-12',
            name: 'CNC-QC-001',
            type: 'CNC',
            status: 'idle',
            efficiency: 68,
            temperature: 28,
            lastMaintenance: '2024-09-22',
            departmentId: 'dept-4'
          },
          {
            id: 'machine-13',
            name: 'Presse-QC-001',
            type: 'Presse',
            status: 'maintenance',
            efficiency: 0,
            temperature: 25,
            lastMaintenance: '2024-09-26',
            departmentId: 'dept-4'
          }
        ]
      }
    ]
  },
  {
    id: 'site-3',
    name: 'Usine Sherbrooke',
    location: 'Sherbrooke, QC',
    country: 'Canada',
    established: '2018',
    departments: [
      {
        id: 'dept-5',
        name: 'Innovation Lab',
        description: 'R&D et prototypage avancé',
        siteId: 'site-3',
        machines: [
          {
            id: 'machine-14',
            name: 'Robot-Proto-01',
            type: 'Robot',
            status: 'running',
            efficiency: 96,
            lastMaintenance: '2024-09-24',
            departmentId: 'dept-5'
          },
          {
            id: 'machine-15',
            name: 'CNC-Precision-01',
            type: 'CNC',
            status: 'running',
            efficiency: 91,
            temperature: 35,
            lastMaintenance: '2024-09-21',
            departmentId: 'dept-5'
          },
          {
            id: 'machine-16',
            name: 'Presse-Nano-01',
            type: 'Presse',
            status: 'idle',
            efficiency: 73,
            temperature: 30,
            lastMaintenance: '2024-09-23',
            departmentId: 'dept-5'
          }
        ]
      }
    ]
  }
]

// Components
const StatusBadge = ({ status }: { status: Machine['status'] }) => {
  const config = {
    running: { color: 'bg-green-100 text-green-800 border-green-200', label: 'En marche', icon: CheckCircle },
    idle: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'En attente', icon: Clock },
    maintenance: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Maintenance', icon: Wrench },
    error: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Erreur', icon: AlertTriangle }
  }
  
  const { color, label, icon: Icon } = config[status]
  
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${color}`}>
      <Icon className="w-4 h-4" />
      {label}
    </span>
  )
}

const MachineCard = ({ machine, onClick }: { machine: Machine; onClick?: () => void }) => {
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency > 80) return 'text-green-600 bg-green-50 border-green-200'
    if (efficiency > 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getStatusColor = (status: Machine['status']) => {
    const colors = {
      running: 'bg-green-500',
      idle: 'bg-yellow-500',
      maintenance: 'bg-blue-500',
      error: 'bg-red-500'
    }
    return colors[status]
  }

  const getMachineIcon = (type: Machine['type']) => {
    const icons = {
      CNC: Cpu,
      Robot: Activity,
      Presse: Factory,
      Convoyeur: TrendingUp,
      Four: Thermometer
    }
    return icons[type]
  }

  const MachineIcon = getMachineIcon(machine.type)

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group"
      onClick={onClick}
    >
      {/* Status indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(machine.status)}`}></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
            <MachineIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{machine.name}</h4>
            <p className="text-sm text-gray-500">{machine.type}</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${getStatusColor(machine.status)} ${machine.status === 'running' ? 'animate-pulse' : ''}`}></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`p-3 rounded-lg border ${getEfficiencyColor(machine.efficiency)}`}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Efficacité</span>
          </div>
          <div className="text-2xl font-bold">{machine.efficiency}%</div>
          <div className="w-full bg-white bg-opacity-50 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                machine.efficiency > 80 ? 'bg-green-500' : 
                machine.efficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${machine.efficiency}%` }}
            ></div>
          </div>
        </div>
        
        {machine.temperature && (
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Temp.</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {machine.temperature}°C
            </div>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <StatusBadge status={machine.status} />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>Maintenance: {new Date(machine.lastMaintenance).toLocaleDateString('fr-CA')}</span>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon: Icon, color, change, subtitle }: {
  title: string
  value: string | number
  icon: React.ElementType
  color: string
  change?: { value: number; positive: boolean }
  subtitle?: string
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {change && (
          <div className={`flex items-center gap-1 text-sm mt-2 ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`w-4 h-4 ${!change.positive && 'rotate-180'}`} />
            {change.positive ? '+' : ''}{change.value}% vs hier
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
    </div>
  </div>
)

const AnalyticsView = ({ machines }: { machines: Machine[] }) => {
  const statusCounts = machines.reduce((acc, machine) => {
    acc[machine.status] = (acc[machine.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const typeCounts = machines.reduce((acc, machine) => {
    acc[machine.type] = (acc[machine.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Répartition des Statuts
          </h3>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const percentage = Math.round((count / machines.length) * 100)
              const colors = {
                running: 'bg-green-500',
                idle: 'bg-yellow-500',
                maintenance: 'bg-blue-500',
                error: 'bg-red-500'
              }
              const labels = {
                running: 'En marche',
                idle: 'En attente', 
                maintenance: 'Maintenance',
                error: 'Erreur'
              }
              return (
                <div key={status} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${colors[status as keyof typeof colors]}`}></div>
                  <span className="text-sm font-medium w-24">{labels[status as keyof typeof labels]}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${colors[status as keyof typeof colors]} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 w-16">{count} ({percentage}%)</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Machine Types */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Factory className="w-5 h-5 text-blue-600" />
            Types de Machines
          </h3>
          <div className="space-y-4">
            {Object.entries(typeCounts).map(([type, count]) => {
              const percentage = Math.round((count / machines.length) * 100)
              return (
                <div key={type} className="flex items-center justify-between py-2">
                  <span className="font-semibold text-gray-900">{type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 w-20">{count} ({percentage}%)</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Performance by Department */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Performance par Département
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.flatMap(site => site.departments).map(dept => {
            const deptMachines = machines.filter(m => m.departmentId === dept.id)
            const avgEfficiency = deptMachines.length > 0 ? Math.round(
              deptMachines.reduce((sum, m) => sum + m.efficiency, 0) / deptMachines.length
            ) : 0
            const runningCount = deptMachines.filter(m => m.status === 'running').length
            
            return (
              <div key={dept.id} className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border">
                <h4 className="font-bold text-gray-900 mb-3">{dept.name}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Machines totales:</span>
                    <span className="font-semibold text-gray-900">{deptMachines.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">En fonctionnement:</span>
                    <span className="font-semibold text-green-600">{runningCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Efficacité moyenne:</span>
                    <span className={`font-semibold ${
                      avgEfficiency > 80 ? 'text-green-600' : 
                      avgEfficiency > 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {avgEfficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        avgEfficiency > 80 ? 'bg-green-500' : 
                        avgEfficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${avgEfficiency}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [typeFilter, setTypeFilter] = useState<MachineTypeFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('hierarchy')

  // Calculate enhanced statistics
  const stats = useMemo(() => {
    const allMachines = mockData.flatMap(site => 
      site.departments.flatMap(dept => dept.machines)
    )

    const total = allMachines.length
    const running = allMachines.filter(m => m.status === 'running').length
    const errors = allMachines.filter(m => m.status === 'error').length
    const maintenance = allMachines.filter(m => m.status === 'maintenance').length
    const avgEfficiency = Math.round(
      allMachines.reduce((sum, m) => sum + m.efficiency, 0) / total
    )
    const totalSites = mockData.length
    const totalDepartments = mockData.reduce((sum, site) => sum + site.departments.length, 0)

    return { total, running, errors, maintenance, avgEfficiency, totalSites, totalDepartments }
  }, [])

  // Filter machines
  const filteredMachines = useMemo(() => {
    let machines = mockData.flatMap(site => 
      site.departments.flatMap(dept => dept.machines)
    )

    if (statusFilter !== 'all') {
      machines = machines.filter(m => m.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      machines = machines.filter(m => m.type === typeFilter)
    }

    if (searchTerm) {
      machines = machines.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return machines
  }, [statusFilter, typeFilter, searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Factory className="w-10 h-10 text-blue-600" />
                Machine Monitoring Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Surveillance intelligente et analyse temps réel de vos équipements industriels
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Dernière mise à jour</p>
              <p className="text-xl font-bold text-blue-600">
                {new Date().toLocaleTimeString('fr-CA')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Sites Industriels"
            value={stats.totalSites}
            icon={Building2}
            color="bg-indigo-500"
            subtitle={`${stats.totalDepartments} départements`}
          />
          <StatCard
            title="Total Machines"
            value={stats.total}
            icon={Users}
            color="bg-blue-500"
            change={{ value: 3.2, positive: true }}
          />
          <StatCard
            title="En Fonctionnement"
            value={stats.running}
            icon={CheckCircle}
            color="bg-green-500"
            change={{ value: 5.7, positive: true }}
            subtitle={`${Math.round((stats.running/stats.total)*100)}% du parc`}
          />
          <StatCard
            title="Efficacité Globale"
            value={`${stats.avgEfficiency}%`}
            icon={TrendingUp}
            color="bg-purple-500"
            change={{ value: 2.1, positive: true }}
          />
          <StatCard
            title="En Maintenance"
            value={stats.maintenance}
            icon={Wrench}
            color="bg-blue-400"
          />
          <StatCard
            title="Erreurs Actives"
            value={stats.errors}
            icon={AlertTriangle}
            color="bg-red-500"
            change={{ value: -1.8, positive: true }}
          />
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold">Filtres & Navigation</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher une machine
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom de machine..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">Tous les statuts</option>
                <option value="running">🟢 En marche</option>
                <option value="idle">🟡 En attente</option>
                <option value="maintenance">🔵 Maintenance</option>
                <option value="error">🔴 Erreur</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de machine
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as MachineTypeFilter)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">Tous les types</option>
                <option value="CNC">⚙️ CNC</option>
                <option value="Robot">🤖 Robot</option>
                <option value="Presse">🔨 Presse</option>
                <option value="Convoyeur">📦 Convoyeur</option>
                <option value="Four">🔥 Four</option>
              </select>
            </div>

            {/* Results count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Résultats
              </label>
              <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-sm font-semibold text-blue-700 border border-blue-200">
                {filteredMachines.length} machine{filteredMachines.length > 1 ? 's' : ''}
              </div>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode affichage
              </label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setViewMode('hierarchy')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'hierarchy'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🏢 Sites
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🔲 Grille
                </button>
                <button
                  onClick={() => setViewMode('analytics')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'analytics'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📊 Stats
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Machine Detail Modal */}
        {selectedMachine && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Factory className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedMachine.name}</h2>
                      <p className="text-lg text-gray-600">{selectedMachine.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMachine(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Statut Actuel</h3>
                    <div className="flex justify-center">
                      <StatusBadge status={selectedMachine.status} />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Efficacité</h3>
                    <div className="text-5xl font-bold text-blue-600 mb-2">
                      {selectedMachine.efficiency}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          selectedMachine.efficiency > 80 ? 'bg-green-500' : 
                          selectedMachine.efficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedMachine.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                  {selectedMachine.temperature && (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-3 text-gray-700">Température</h3>
                      <div className="text-5xl font-bold text-orange-600 mb-2">
                        {selectedMachine.temperature}°C
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Thermometer className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Monitoring actif</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Informations de Maintenance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Dernière maintenance</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(selectedMachine.lastMaintenance).toLocaleDateString('fr-CA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Prochaine maintenance prévue</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {new Date(new Date(selectedMachine.lastMaintenance).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-CA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {viewMode === 'hierarchy' ? (
          <div className="space-y-8">
            {mockData.map(site => (
              <div key={site.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Factory className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{site.name}</h2>
                      <div className="flex items-center gap-6 text-gray-600 mt-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {site.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Établi en {site.established}
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {site.departments.length} département{site.departments.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="space-y-8">
                    {site.departments.map(department => (
                      <div key={department.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{department.name}</h3>
                          <p className="text-gray-600">{department.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {department.machines
                            .filter(machine => {
                              const matchesStatus = statusFilter === 'all' || machine.status === statusFilter
                              const matchesType = typeFilter === 'all' || machine.type === typeFilter
                              const matchesSearch = !searchTerm || machine.name.toLowerCase().includes(searchTerm.toLowerCase())
                              return matchesStatus && matchesType && matchesSearch
                            })
                            .map(machine => (
                              <MachineCard
                                key={machine.id}
                                machine={machine}
                                onClick={() => setSelectedMachine(machine)}
                              />
                            ))
                          }
                        </div>
                        
                        {department.machines.filter(machine => {
                          const matchesStatus = statusFilter === 'all' || machine.status === statusFilter
                          const matchesType = typeFilter === 'all' || machine.type === typeFilter
                          const matchesSearch = !searchTerm || machine.name.toLowerCase().includes(searchTerm.toLowerCase())
                          return matchesStatus && matchesType && matchesSearch
                        }).length === 0 && (
                          <div className="text-center py-8">
                            <div className="text-gray-400 mb-2">
                              <Search className="w-12 h-12 mx-auto" />
                            </div>
                            <p className="text-gray-500">Aucune machine ne correspond aux filtres sélectionnés</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-600" />
              Toutes les Machines ({filteredMachines.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMachines.map(machine => (
                <MachineCard
                  key={machine.id}
                  machine={machine}
                  onClick={() => setSelectedMachine(machine)}
                />
              ))}
            </div>
            
            {filteredMachines.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        ) : (
          <AnalyticsView machines={filteredMachines} />
        )}
      </div>
    </div>
  )
}