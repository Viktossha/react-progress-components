import {Navigate, NavLink, Route, Routes} from 'react-router'
import s from './App.module.css'
import {ProgressPage} from './pages/ProgressPage.tsx'
import {ChartPage} from './pages/ChartPage.tsx'

export const App = () => {
    return (
        <div className={s.app}>
            <nav className={s.nav}>
                <NavLink
                    to="/progress"
                    className={({isActive}) => (isActive ? `${s.link} ${s.linkActive}` : s.link)}
                >
                    Progress
                </NavLink>
                <NavLink
                    to="/chart"
                    className={({isActive}) => (isActive ? `${s.link} ${s.linkActive}` : s.link)}
                >
                    Chart
                </NavLink>
            </nav>

            <main className={s.page}>
                <Routes>
                    <Route path="/" element={<Navigate to="/progress" replace/>}/>
                    <Route path="/progress" element={<ProgressPage/>}/>
                    <Route path="/chart" element={<ChartPage/>}/>
                </Routes>
            </main>
        </div>
    )
}
