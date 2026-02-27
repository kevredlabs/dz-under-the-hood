import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { TheProblem } from './pages/TheProblem'
import { TheNetwork } from './pages/TheNetwork'
import { HowItWorks } from './pages/HowItWorks'
import { Software } from './pages/Software'
import { EdgeFiltering } from './pages/EdgeFiltering'
import { Onchain } from './pages/Onchain'
import { Glossary } from './pages/Glossary'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/the-problem" element={<TheProblem />} />
        <Route path="/the-network" element={<TheNetwork />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/software" element={<Software />} />
        <Route path="/edge-filtering" element={<EdgeFiltering />} />
        <Route path="/onchain" element={<Onchain />} />
        <Route path="/glossary" element={<Glossary />} />
      </Route>
    </Routes>
  )
}
