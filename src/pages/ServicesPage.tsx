import { Check, Zap, Briefcase, Megaphone, MessageCircle } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <main className="container mx-auto max-w-6xl">
        {/* Título de Sección */}
        <div className="text-center mb-16">
          <h2 className="text-[#125b69] font-bold tracking-widest text-sm uppercase mb-3">Nuestras Soluciones</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-6 italic">Elige el paquete ideal para tu <span className="text-[#125b69]">crecimiento digital</span></h1>
          <p className="text-[#6b7280] max-w-2xl mx-auto">Diseñamos herramientas digitales estratégicas adaptadas al tamaño y necesidades de tu negocio.</p>
        </div>

        {/* Grid de Paquetes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* PAQUETE 1: ESENCIAL */}
            <div className="bg-[#ffffff] rounded-3xl p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border border-[#e5e7eb] transform transition-all hover:-translate-y-2 flex flex-col">
                <div className="mb-8">
                    <div className="w-12 h-12 bg-[#f9fafb] rounded-2xl flex items-center justify-center mb-6 text-[#9ca3af]">
                        <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#111827] mb-2">🟢 Esencial</h3>
                    <p className="text-sm text-[#6b7280] mb-6">🎯 Ideal para emprendimientos que necesitan presencia básica online.</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#0a363e]">800 – 1200</span>
                        <span className="text-lg font-bold text-[#9ca3af] tracking-tight">Bs</span>
                    </div>
                </div>

                <div className="flex-grow">
                    <p className="text-xs font-bold text-[#125b69] uppercase tracking-widest mb-4">Incluye:</p>
                    <ul className="space-y-3 text-sm text-[#4b5563]">
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Hasta 3 secciones (Inicio, Servicios, Contacto)</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Diseño sobre plantilla base</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Diseño responsive (Móvil/Tablet)</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Integración con WhatsApp</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Optimización básica de velocidad</li>
                    </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-[#f9fafb]">
                    <p className="text-xs text-[#6b7280] mb-4 italic">⏱️ Entrega: 7 a 10 días</p>
                    <button className="block w-full py-3 bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#4b5563] font-bold rounded-xl text-center transition-colors">Elegir Esencial</button>
                </div>
            </div>

            {/* PAQUETE 2: PROFESIONAL (DESTACADO) */}
            <div className="bg-[#0a363e] rounded-3xl p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border-4 border-[#125b69] transform transition-all hover:-translate-y-2 flex flex-col relative overflow-hidden md:scale-105 z-10">
                {/* Badge Destacado */}
                <div className="absolute top-0 right-0 bg-[#f1b51c] text-[#0a363e] text-[10px] font-bold px-4 py-1 rounded-bl-xl">RECOMENDADO</div>
                
                <div className="mb-8">
                    <div className="w-12 h-12 bg-[#125b69] rounded-2xl flex items-center justify-center mb-6 text-[#f1b51c] shadow-lg">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#ffffff] mb-2">🟡 Profesional</h3>
                    <p className="text-sm text-[#9ca3af] mb-6">🎯 Ideal para negocios que quieren una web completa y profesional.</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#ffffff]">1500 – 2200</span>
                        <span className="text-lg font-bold text-[#f1b51c] tracking-tight">Bs</span>
                    </div>
                </div>

                <div className="flex-grow">
                    <p className="text-xs font-bold text-[#f1b51c] uppercase tracking-widest mb-4">Incluye:</p>
                    <ul className="space-y-3 text-sm text-[#e5e7eb]">
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Hasta 6 secciones completas</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Diseño 100% Personalizado</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Blog funcional incorporado</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Optimización SEO (Yoast)</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Optimización avanzada de velocidad</li>
                    </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-[#ffffff1a]">
                    <p className="text-xs text-[#f1b51c] mb-4 font-semibold">⏱️ Entrega: 2 a 3 semanas</p>
                    <button className="block w-full py-4 bg-[#125b69] hover:bg-[#ffffff] hover:text-[#0a363e] text-[#ffffff] font-bold rounded-xl text-center transition-all shadow-lg">Solicitar Profesional</button>
                </div>
            </div>

            {/* PAQUETE 3: PREMIUM */}
            <div className="bg-[#ffffff] rounded-3xl p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border border-[#e5e7eb] transform transition-all hover:-translate-y-2 flex flex-col">
                <div className="mb-8">
                    <div className="w-12 h-12 bg-[#f9fafb] rounded-2xl flex items-center justify-center mb-6 text-[#9ca3af]">
                        <Megaphone className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#111827] mb-2">🔴 Premium</h3>
                    <p className="text-sm text-[#6b7280] mb-6">🎯 Ideal para empresas que buscan una web estratégica y escalable.</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-[#9ca3af] mr-1 italic">Desde</span>
                        <span className="text-3xl font-extrabold text-[#0a363e]">2500</span>
                        <span className="text-lg font-bold text-[#9ca3af] tracking-tight">Bs</span>
                    </div>
                </div>

                <div className="flex-grow">
                    <p className="text-xs font-bold text-[#125b69] uppercase tracking-widest mb-4">Incluye:</p>
                    <ul className="space-y-3 text-sm text-[#4b5563]">
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Secciones ilimitadas</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Enfoque estratégico en conversión</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Catálogo de productos detallado</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Integraciones avanzadas</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-[#f1b51c] flex-shrink-0 mt-1" /> Soporte prioritario (30 días)</li>
                    </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-[#f9fafb]">
                    <p className="text-xs text-[#6b7280] mb-4 italic">⏱️ Entrega: 3 a 5 semanas</p>
                    <button className="block w-full py-3 bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#4b5563] font-bold rounded-xl text-center transition-colors">Elegir Premium</button>
                </div>
            </div>

        </div>

        {/* Sección de Soporte y Extras */}
        <div className="max-w-4xl mx-auto mt-24 bg-[#f0f7f8] rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h4 className="text-xl font-bold text-[#0a363e] mb-4">Preguntas Frecuentes</h4>
                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="font-bold text-[#125b69]">¿Qué incluye el soporte post-entrega?</p>
                            <p className="text-[#6b7280]">Asistencia técnica para asegurar que todo funcione correctamente y resolución de dudas sobre la gestión de contenidos.</p>
                        </div>
                        <div>
                            <p className="font-bold text-[#125b69]">¿Cómo son las revisiones?</p>
                            <p className="text-[#6b7280]">Presentamos un avance y tú nos indicas qué ajustes prefieres en el diseño o estructura según el paquete elegido.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#ffffff] p-6 rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border border-[#f3f4f6] flex flex-col justify-center text-center">
                    <p className="text-sm font-medium text-[#9ca3af] mb-2 uppercase tracking-widest italic">¿Tienes un proyecto especial?</p>
                    <h4 className="text-2xl font-bold text-[#111827] mb-4 italic">Hablemos por WhatsApp</h4>
                    <a href="https://wa.me/59178567545" target="_blank" className="inline-flex items-center justify-center gap-2 bg-[#22c55e] text-[#ffffff] py-3 px-6 rounded-xl font-bold hover:bg-[#16a34a] transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        Escríbenos ahora
                    </a>
                </div>
            </div>
        </div>
      </main>
      
      <footer className="mt-24 py-12 border-t border-[#f3f4f6] bg-[#ffffff]">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center text-xs text-[#9ca3af]">
            <p>© {new Date().getFullYear()} KODO — Desarrollo Web & Diseño Estratégico.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <span>villcuellar99@gmail.com</span>
                <span>Santa Cruz, Bolivia</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
