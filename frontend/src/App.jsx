import { useMemo, useState } from 'react'
import './assets/styles/globals.css'

const demoAccounts = {
  superuser: { email: 'superuser@martinsdirect.com', password: 'demo123', firstLogin: false },
  franchisee: { email: 'franchisee@martinsdirect.com', password: 'demo123', firstLogin: true },
  manager: { email: 'manager@martinsdirect.com', password: 'demo123', firstLogin: false },
  agent: { email: 'agent@martinsdirect.com', password: 'demo123', firstLogin: false }
}

const navForRole = {
  superuser: {
    main: ['Dashboard', 'Franchise', 'Payments', 'Admin Settings'],
    franchise: ['Reports Dashboard', 'Upload Bank Statement', 'Auto Match Payments', 'Unmatched Payments', 'Employees'],
    payments: ['Receipt Generation']
  },
  franchisee: {
    main: ['Dashboard', 'Franchise', 'Payments'],
    franchise: ['Reports Dashboard', 'Upload Bank Statement', 'Auto Match Payments', 'Unmatched Payments', 'Employees'],
    payments: ['Receipt Generation']
  },
  manager: {
    main: ['Dashboard', 'Franchise', 'Payments'],
    franchise: ['Upload Bank Statement', 'Auto Match Payments', 'Unmatched Payments', 'Employees'],
    payments: ['Receipt Generation']
  },
  agent: {
    main: ['Dashboard', 'Franchise', 'Payments'],
    franchise: ['Upload Bank Statement', 'Auto Match Payments', 'Unmatched Payments', 'Employees'],
    payments: ['Receipt Generation']
  }
}

const employeesAccess = {
  superuser: 'Can see all franchisees, managers, and agents across the system. View-focused oversight for all records.',
  franchisee: 'Can add, edit, and deactivate any record under their franchise.',
  manager: 'Can add and edit records under their franchise, but cannot deactivate them.',
  agent: 'Can add records only under their franchise.'
}

function toTitleCase(value) {
  return value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function Logo({ small = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={small ? 'logo-fallback logo-fallback-small' : 'logo-fallback'}>
        MD
      </div>
    )
  }

  return (
    <img
      src="/logo.png"
      alt="Martinsdirect logo"
      className={small ? 'brand-logo-small' : 'brand-logo-large'}
      onError={() => setFailed(true)}
    />
  )
}

function LoginScreen({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3f6] px-4">
      <div className="w-full max-w-[380px] rounded-2xl border border-[#e7e3ef] bg-white p-8 shadow-lg">

        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="Martins Franchising"
            className="mx-auto h-20 object-contain"
          />

          <h1 className="mt-4 text-1xl font-semibold text-slate-900">
            Welcome Back
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="space-y-4">

          <div>
            <label className="text-sm font-medium text-slate-700">
              Email (User Login)
            </label>
            <input
              defaultValue="superuser@martinsdirect.com"
              className="mt-1 w-full rounded-lg border border-[#e7e1f0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8f73b5]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Password (User Password)
            </label>
            <input
              defaultValue="demo123"
              type="password"
              className="mt-1 w-full rounded-lg border border-[#e7e1f0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8f73b5]"
            />
          </div>

          <button
            className="w-full rounded-lg bg-[#8f73b5] py-2 text-sm font-semibold text-white hover:bg-[#7e62a6]"
            onClick={() => onLogin("superuser")}
          >
            Login
          </button>

          <p className="text-center text-sm">
            <a
              href="#"
              className="text-[#7e62a6] underline underline-offset-4"
            >
              Reset password
            </a>
          </p>

        </div>

      </div>
    </div>
  )
}

function FirstTimeSetup({ onComplete }) {
  const [franchiseName] = useState('Martins North')
  const [taName, setTaName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [email, setEmail] = useState('franchisee@martinsdirect.com')
  const [phone, setPhone] = useState('')
  const [hotline, setHotline] = useState('')
  const [officeAddress, setOfficeAddress] = useState('')

  const franchiseCode = useMemo(() => {
    const code = (franchiseName || 'FRA').replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase()
    return `${code || 'FRA'}001`
  }, [franchiseName])

  return (
    <div className="page-shell">
      <div className="setup-header">
        <div>
          <h1>First-Time Franchisee Setup</h1>
          <p>Complete your franchise profile before entering the system.</p>
        </div>
        <span className="pill">Franchise code: {franchiseCode}</span>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Franchise Profile</h2>
            <p>Franchise name is preloaded by superuser. Add the remaining business and banking information.</p>
          </div>
        </div>

        <div className="setup-grid">
          <div className="col-stack">
            <div className="form-group">
              <label>Franchise Name</label>
              <input value={franchiseName} readOnly />
            </div>

            <div className="form-group">
              <label>T/A Name</label>
              <input value={taName} onChange={(e) => setTaName(e.target.value)} />
            </div>

            <div className="grid-two">
              <div className="form-group">
                <label>Pty / CK Number</label>
                <input />
              </div>
              <div className="form-group">
                <label>VAT Number</label>
                <input />
              </div>
            </div>

            <div className="form-group">
              <label>Owner / Full Name and Surname</label>
              <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            </div>

            <div className="grid-two">
              <div className="form-group">
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="grid-two">
              <div className="form-group">
                <label>24 Hour Number</label>
                <input value={hotline} onChange={(e) => setHotline(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" defaultValue="demo123" />
              </div>
            </div>

            <div className="form-group">
              <label>Office Address</label>
              <input value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} />
            </div>
          </div>

          <div className="col-stack">
            <div className="sub-panel">
              <h3>Bank Details: Insurance</h3>
              <div className="form-group"><label>Bank</label><input /></div>
              <div className="form-group"><label>Account Number</label><input /></div>
              <div className="form-group"><label>Branch</label><input /></div>
            </div>

            <div className="sub-panel">
              <h3>Bank Details: Business</h3>
              <div className="form-group"><label>Bank</label><input /></div>
              <div className="form-group"><label>Account Number</label><input /></div>
              <div className="form-group"><label>Branch</label><input /></div>
            </div>

            <div className="info-box">
              <strong>What happens after saving</strong>
              <ul>
                <li>Franchisee account is created.</li>
                <li>Franchise record is created.</li>
                <li>You become the owner of this franchise.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel-actions">
          <button className="primary-btn" onClick={onComplete}>
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  )
}

function DashboardShell({ role, onLogout }) {
  const nav = navForRole[role]
  const [section, setSection] = useState('Dashboard')
  const [subsection, setSubsection] = useState('Employees')
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)

  const [employeeType, setEmployeeType] = useState('manager')
  const [securityRole, setSecurityRole] = useState('manager')
  const [employeeStatus, setEmployeeStatus] = useState('active')
  const [employeeTitle, setEmployeeTitle] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [employeeIdNumber, setEmployeeIdNumber] = useState('')
  const [employeeEmail, setEmployeeEmail] = useState('')
  const [employeePhone, setEmployeePhone] = useState('')
  const [employeeUsername, setEmployeeUsername] = useState('')
  const [employeePassword, setEmployeePassword] = useState('')
  const [employeeBranch, setEmployeeBranch] = useState('Head Office')
  const [employeeVendorsId, setEmployeeVendorsId] = useState('')
  const [employeePinCode, setEmployeePinCode] = useState('')
  const [employeeNotes, setEmployeeNotes] = useState('')
  const [dateEmployed, setDateEmployed] = useState('')
  const [dateQuickEntry, setDateQuickEntry] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const [employees, setEmployees] = useState([
    { id: 1, role: 'Franchisee', name: 'Nandi Mokoena', status: 'Active', email: 'nandi@martinsdirect.com', branch: 'Head Office' },
    { id: 2, role: 'Manager', name: 'Sipho Nkosi', status: 'Active', email: 'sipho@martinsdirect.com', branch: 'Branch A' },
    { id: 3, role: 'Agent', name: 'Lebo Dlamini', status: 'Not Active', email: 'lebo@martinsdirect.com', branch: 'Branch A' }
  ])

  const formatEightDigitDate = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    if (digits.length !== 8) return null
    const day = digits.slice(0, 2)
    const month = digits.slice(2, 4)
    const year = digits.slice(4, 8)
    const dayNum = Number(day)
    const monthNum = Number(month)
    const yearNum = Number(year)
    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900) return null
    return `${year}-${month}-${day}`
  }

  const handleQuickDateChange = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    setDateQuickEntry(digits)
    const parsed = formatEightDigitDate(digits)
    if (parsed) setDateEmployed(parsed)
  }

  const resetEmployeeForm = () => {
    setEmployeeType('manager')
    setSecurityRole('manager')
    setEmployeeStatus('active')
    setEmployeeTitle('')
    setEmployeeName('')
    setEmployeeIdNumber('')
    setEmployeeEmail('')
    setEmployeePhone('')
    setEmployeeUsername('')
    setEmployeePassword('')
    setEmployeeBranch('Head Office')
    setEmployeeVendorsId('')
    setEmployeePinCode('')
    setEmployeeNotes('')
    setDateEmployed('')
    setDateQuickEntry('')
  }

  const handleAddEmployee = () => {
    const nextRole = securityRole === 'manager' ? 'Manager' : 'Agent'
    const nextStatus = employeeStatus === 'inactive' ? 'Not Active' : 'Active'
    const nextBranch = nextRole === 'Manager' ? employeeBranch : '-'

    setEmployees((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: nextRole,
        name: toTitleCase(employeeName.trim() || 'new member'),
        status: nextStatus,
        email: employeeEmail.trim() || `${securityRole}@martinsdirect.com`,
        branch: nextBranch,
        loginUsername: employeeUsername,
        password: employeeStatus === 'inactive' ? 'deactivated-reset-required' : employeePassword,
        dateEmployed
      }
    ])

    resetEmployeeForm()
    setShowEmployeeForm(false)
  }

  const handleDeleteEmployee = (id) => {
    if (!['superuser', 'franchisee'].includes(role)) return
    setEmployees((prev) => prev.filter((employee) => employee.id !== id))
  }

  const filteredEmployees = employees.filter((user) => {
    const matchesSearch =
      !searchTerm ||
      [user.name, user.email, user.role, user.branch].join(' ').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase().replace(/\s+/g, '-') === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const renderContent = () => {
    if (section === 'Dashboard') {
      return (
        <>
          <div className="stats-grid">
            <div className="stat-card"><span>Total Employees</span><strong>{employees.length}</strong></div>
            <div className="stat-card"><span>Reports Access</span><strong>{['superuser', 'franchisee'].includes(role) ? 'Yes' : 'No'}</strong></div>
            <div className="stat-card"><span>Admin Settings</span><strong>{role === 'superuser' ? 'Yes' : 'No'}</strong></div>
            <div className="stat-card"><span>System Role</span><strong className="capitalize">{role}</strong></div>
          </div>
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Dashboard Overview</h2>
                <p>Professional dashboard foundation for Martinsdirect.</p>
              </div>
            </div>
            <p>This starter includes the login screen, sidebar navigation, Franchise tabs, Employees module, Reports module, Payments section, and Admin Settings visibility.</p>
          </div>
        </>
      )
    }

    if (section === 'Franchise' && subsection === 'Employees') {
      return (
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Employees</h2>
              <p>{employeesAccess[role]}</p>
            </div>
          </div>

          <div className="toolbar">
            <input
              placeholder="Search by name, email, or username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All roles</option>
              <option value="franchisee">Franchisee</option>
              <option value="manager">Manager</option>
              <option value="agent">Agent</option>
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="not-active">Not Active</option>
            </select>

            <button className="primary-btn" onClick={() => setShowEmployeeForm(true)}>
              New Member
            </button>
          </div>

          {showEmployeeForm && (
            <div className="sub-panel employee-form-wrap">
              <div className="panel-header">
                <div>
                  <h3>New Member Form</h3>
                  <p>Select employee type, complete the details, then add the member.</p>
                </div>
                <button
                  className="secondary-btn"
                  onClick={() => {
                    resetEmployeeForm()
                    setShowEmployeeForm(false)
                  }}
                >
                  Close
                </button>
              </div>

              <div className="info-box">
                {employeeStatus === 'inactive'
                  ? 'Not Active selected: on backend save, this employee must be deactivated across all roles and their password must be replaced or reset immediately.'
                  : 'Active selected: employee can log in using the saved credentials and assigned role access.'}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Employee Type</label>
                  <select
                    value={employeeType}
                    onChange={(e) => {
                      setEmployeeType(e.target.value)
                      setSecurityRole(e.target.value)
                    }}
                  >
                    <option value="manager">Manager</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Security Role</label>
                  {(role === 'superuser' || role === 'franchisee') ? (
                    <select value={securityRole} onChange={(e) => setSecurityRole(e.target.value)}>
                      {employeeType === 'manager' ? (
                        <option value="manager">Manager</option>
                      ) : (
                        <option value="agent">Agent</option>
                      )}
                    </select>
                  ) : (
                    <input value={employeeType === 'manager' ? 'Manager' : 'Agent'} readOnly />
                  )}
                </div>

                <div className="form-group">
                  <label>Title</label>
                  <input value={employeeTitle} onChange={(e) => setEmployeeTitle(e.target.value)} placeholder="Mr / Ms / Dr" />
                </div>

                <div className="form-group">
                  <label>Name and Surname</label>
                  <input value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>ID Number</label>
                  <input value={employeeIdNumber} onChange={(e) => setEmployeeIdNumber(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input value={employeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input value={employeePhone} onChange={(e) => setEmployeePhone(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Login Username</label>
                  <input value={employeeUsername} onChange={(e) => setEmployeeUsername(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Login Password</label>
                  <input type="password" value={employeePassword} onChange={(e) => setEmployeePassword(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Date Employed</label>
                  <div className="inline-grid">
                    <input type="date" value={dateEmployed} onChange={(e) => setDateEmployed(e.target.value)} />
                    <input
                      placeholder="Quick entry: 15051982"
                      value={dateQuickEntry}
                      onChange={(e) => handleQuickDateChange(e.target.value)}
                    />
                  </div>
                </div>

                {employeeType === 'manager' && (
                  <div className="form-group">
                    <label>Branch</label>
                    <select value={employeeBranch} onChange={(e) => setEmployeeBranch(e.target.value)}>
                      <option value="Head Office">Head Office</option>
                      <option value="Branch A">Branch A</option>
                      <option value="Branch B">Branch B</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label>Vendors ID</label>
                  <input value={employeeVendorsId} onChange={(e) => setEmployeeVendorsId(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Pin Code</label>
                  <input value={employeePinCode} onChange={(e) => setEmployeePinCode(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select value={employeeStatus} onChange={(e) => setEmployeeStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="inactive">Not Active</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <input value={employeeNotes} onChange={(e) => setEmployeeNotes(e.target.value)} />
                </div>
              </div>

              <div className="panel-actions">
                <button className="primary-btn" onClick={handleAddEmployee}>
                  Add Member
                </button>
              </div>
            </div>
          )}

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Branch</th>
                  <th>Status</th>
                  {['superuser', 'franchisee'].includes(role) && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.branch}</td>
                    <td>
                      <span className={user.status === 'Active' ? 'status-active' : 'status-inactive'}>
                        {user.status}
                      </span>
                    </td>
                    {['superuser', 'franchisee'].includes(role) && (
                      <td>
                        <button className="delete-btn" onClick={() => handleDeleteEmployee(user.id)}>
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    if (section === 'Franchise' && subsection === 'Reports Dashboard') {
      return (
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Reports Dashboard</h2>
              <p>Visible to Superuser and Franchisee only.</p>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><span>Total Uploaded Statements</span><strong>12</strong></div>
            <div className="stat-card"><span>Auto Matched</span><strong>187</strong></div>
            <div className="stat-card"><span>Unmatched</span><strong>9</strong></div>
            <div className="stat-card"><span>Receipts Generated</span><strong>84</strong></div>
          </div>
        </div>
      )
    }

    if (section === 'Payments' && subsection === 'Receipt Generation') {
      return (
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Receipt Generation</h2>
              <p>Create and manage payment receipts.</p>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Receipt Number</label><input placeholder="RCP-0001" /></div>
            <div className="form-group"><label>Customer / Franchise</label><input placeholder="Enter name" /></div>
            <div className="form-group"><label>Amount</label><input placeholder="0.00" /></div>
            <div className="form-group"><label>Date</label><input type="date" /></div>
          </div>
          <div className="panel-actions">
            <button className="primary-btn">Generate Receipt</button>
          </div>
        </div>
      )
    }

    if (section === 'Admin Settings') {
      return (
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Admin Settings</h2>
              <p>Superuser-only configuration area.</p>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>System Name</label><input defaultValue="Martinsdirect System" /></div>
            <div className="form-group"><label>Support Email</label><input defaultValue="support@martinsdirect.com" /></div>
            <div className="form-group"><label>Theme</label><input defaultValue="Light Grey + Lilac" readOnly /></div>
            <div className="form-group"><label>Logo Path</label><input defaultValue="/logo.png" readOnly /></div>
          </div>
          <div className="panel-actions">
            <button className="primary-btn">Save Settings</button>
          </div>
        </div>
      )
    }

    return (
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>{subsection}</h2>
            <p>Module placeholder ready for the next step.</p>
          </div>
        </div>
        <p>This section is now part of the real dashboard layout and is ready for backend connection.</p>
      </div>
    )
  }

  const loggedInName = demoAccounts[role]?.email || role

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">MD</div>
          <div>
            <div className="sidebar-brand-title">Martinsdirect</div>
            <div className="sidebar-brand-subtitle">{role} portal</div>
          </div>
        </div>

        <div className="sidebar-section">
          <button className={section === 'Dashboard' ? 'nav-btn active' : 'nav-btn'} onClick={() => setSection('Dashboard')}>
            Dashboard
          </button>
        </div>

        <div className="sidebar-section">
          <button className={section === 'Franchise' ? 'nav-btn active' : 'nav-btn'} onClick={() => setSection('Franchise')}>
            Franchise
          </button>
          <div className="subnav">
            {nav.franchise.map((item) => (
              <button
                key={item}
                className={section === 'Franchise' && subsection === item ? 'subnav-btn active' : 'subnav-btn'}
                onClick={() => {
                  setSection('Franchise')
                  setSubsection(item)
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <button className={section === 'Payments' ? 'nav-btn active' : 'nav-btn'} onClick={() => setSection('Payments')}>
            Payments
          </button>
          <div className="subnav">
            {nav.payments.map((item) => (
              <button
                key={item}
                className={section === 'Payments' && subsection === item ? 'subnav-btn active' : 'subnav-btn'}
                onClick={() => {
                  setSection('Payments')
                  setSubsection(item)
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {nav.main.includes('Admin Settings') && (
          <div className="sidebar-section">
            <button
              className={section === 'Admin Settings' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setSection('Admin Settings')}
            >
              Admin Settings
            </button>
          </div>
        )}

        <div className="sidebar-user">
          <div className="sidebar-user-badge">{role.slice(0, 2).toUpperCase()}</div>
          <div className="sidebar-user-info">
            <strong>{role}</strong>
            <span>Signed in</span>
          </div>
          <button className="secondary-btn logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar panel">
          <div>
            <h1>{section === 'Franchise' || section === 'Payments' ? subsection : section}</h1>
            <p>Professional dashboard starter matching your system structure.</p>
          </div>

          <div className="topbar-right">
            <div className="logged-in-user">
              <span>Signed in as</span>
              <strong>{loggedInName}</strong>
            </div>
            <Logo small />
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState(null)
  const [needsSetup, setNeedsSetup] = useState(false)

  const handleLogin = (nextRole) => {
    setRole(nextRole)
    setNeedsSetup(demoAccounts[nextRole]?.firstLogin || false)
  }

  const handleLogout = () => {
    setRole(null)
    setNeedsSetup(false)
  }

  if (!role) return <LoginScreen onLogin={handleLogin} />
  if (role === 'franchisee' && needsSetup) return <FirstTimeSetup onComplete={() => setNeedsSetup(false)} />

  return <DashboardShell role={role} onLogout={handleLogout} />
}