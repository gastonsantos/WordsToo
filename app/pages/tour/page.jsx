"use client"
import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Historia from '@/components/historia/historia.jsx'

export default function App () {
  const radius = 10
  
  return (
    <TourProvider 
    className=''
      steps={steps} 
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': '#000000',
          borderRadius: radius,
          color: '#000000',
          fontWeight: 'bold', // Hacer la letra en negrita
        }),
        maskWrapper: (base) => ({ 
          ...base, 
          backgroundColor: 'rgba(0, 0, 0, 0.9)', // Más oscuro con opacidad alta
        }),
        badge: (base) => ({ 
          ...base, 
          left: 'auto', 
          right: '-0.8125em' 
        }),
        controls: (base) => ({ 
          ...base, 
          marginTop: 100 
        }),
        close: (base) => ({ 
          ...base, 
          right: 'auto', 
          left: 8, 
          top: 8, 
          color: '#000000' 
        }),
      }}
    >
      <Historia />
    </TourProvider>
  )
}
