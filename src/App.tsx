import { useRef, useState } from 'react';
import { FileText, Presentation, Loader2, Lightbulb, Zap, Box, Palette, Clock, Settings, RefreshCw, LifeBuoy, Info, Check, Mail, Phone } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import pptxgen from 'pptxgenjs';
import html2canvas from 'html2canvas';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!containerRef.current) return;
    setIsExporting(true);

    const element = containerRef.current;
    const opt: any = {
      margin: [10, 0, 10, 0],
      filename: 'Propuesta_KODO_Play_Zone.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        onclone: (clonedDoc: Document) => {
          // Remove CSS rules that use oklab or oklch which cause parsing errors in some PDF engines
          Array.from(clonedDoc.styleSheets).forEach(sheet => {
            try {
              const rules = Array.from(sheet.cssRules);
              for (let i = rules.length - 1; i >= 0; i--) {
                const rule = rules[i];
                if (rule.cssText.includes('oklab') || rule.cssText.includes('oklch')) {
                  sheet.deleteRule(i);
                }
              }
            } catch (e) {
              // Skip cross-origin stylesheets that we can't access
            }
          });
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPPTX = async () => {
    if (!containerRef.current) return;
    setIsExporting(true);

    try {
      const pres = new pptxgen();
      pres.layout = 'LAYOUT_16x9';

      const sections = containerRef.current.querySelectorAll('.export-section');
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc: Document) => {
            // Remove CSS rules that use oklab or oklch which cause parsing errors
            Array.from(clonedDoc.styleSheets).forEach(sheet => {
              try {
                const rules = Array.from(sheet.cssRules);
                for (let i = rules.length - 1; i >= 0; i--) {
                  const rule = rules[i];
                  if (rule.cssText.includes('oklab') || rule.cssText.includes('oklch')) {
                    sheet.deleteRule(i);
                  }
                }
              } catch (e) {
                // Skip cross-origin stylesheets
              }
            });
          }
        });
        
        const imgData = canvas.toDataURL('image/png');
        const slide = pres.addSlide();
        
        slide.addImage({
          data: imgData,
          x: 0,
          y: 0,
          w: '100%',
          h: '100%',
          sizing: { type: 'contain', w: 10, h: 5.625 }
        });
      }

      await pres.writeFile({ fileName: 'Propuesta_KODO_Play_Zone.pptx' });
    } catch (error) {
      console.error('Error exporting PPTX:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 no-print flex flex-col gap-3">
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="bg-[#125b69] hover:bg-[#0a363e] text-[#ffffff] font-semibold py-3 px-6 rounded-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] flex items-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
        >
          {isExporting ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
          Descargar PDF
        </button>
        <button
          onClick={handleExportPPTX}
          disabled={isExporting}
          className="bg-[#f1b51c] hover:bg-[#d97706] text-[#ffffff] font-semibold py-3 px-6 rounded-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] flex items-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
        >
          {isExporting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Presentation className="h-5 w-5" />}
          Descargar PPTX
        </button>
      </div>

      <main className="container mx-auto max-w-4xl">
        {/* Document Wrapper */}
        <div 
          id="propuesta-container" 
          ref={containerRef}
          className="bg-[#ffffff] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] rounded-2xl overflow-hidden print-border relative"
        >
          {/* Header Accent */}
          <div className="h-3 w-full" style={{ background: 'linear-gradient(to right, #125b69, #f1b51c)' }}></div>

          <div className="p-8 md:p-12">
            
            {/* PORTADA & INTRO (Section 1) */}
            <div className="export-section">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#f3f4f6] pb-10 mb-10">
                <div className="mb-6 md:mb-0">
                  <div className="relative w-40 h-16 mb-4 flex items-center">
                    <span className="text-4xl font-bold text-[#125b69] tracking-tighter">K<span className="text-[#f1b51c]">Ō</span>DO</span>
                  </div>
                  <h1 className="text-3xl font-bold text-[#111827] mb-1">Propuesta de Desarrollo Web</h1>
                  <p className="text-[#125b69] font-medium tracking-wide uppercase text-sm">KODO — Agencia Digital</p>
                </div>
                <div className="text-left md:text-right bg-[#f0f7f8] p-4 rounded-xl">
                  <p className="text-sm text-[#6b7280] mb-1">Preparado para:</p>
                  <p className="text-xl font-bold text-[#111827]">Play Zone</p>
                  <p className="text-sm text-[#6b7280] mt-2 flex items-center justify-start md:justify-end gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {/* 1. Introducción */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-[#111827]">1. Introducción</h2>
                  </div>
                  <p className="text-[#4b5563] leading-relaxed mb-4 text-sm">
                    En KODO, el enfoque no es solo desarrollar una página web, sino construir una herramienta digital que represente correctamente la calidad del servicio del cliente y facilite la generación de nuevas oportunidades de negocio.
                  </p>
                  <p className="text-[#4b5563] leading-relaxed text-sm font-medium">
                    Para <span className="text-[#125b69] font-bold">Play Zone</span>, el objetivo principal es desarrollar una web que:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[#4b5563]">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#f1b51c] flex-shrink-0" /> 
                      Transmita calidad, confianza y experiencia.
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#f1b51c] flex-shrink-0" /> 
                      Muestre de forma atractiva sus proyectos realizados.
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#f1b51c] flex-shrink-0" /> 
                      Facilite el contacto con potenciales clientes.
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#f1b51c] flex-shrink-0" /> 
                      Refuerce su posicionamiento en el mercado.
                    </li>
                  </ul>
                </div>

                {/* 2. Objetivo del Proyecto */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-[#111827]">2. Objetivo del Proyecto</h2>
                  </div>
                  <p className="text-[#4b5563] leading-relaxed text-sm mb-4">
                    Diseñar y desarrollar una página web corporativa moderna, funcional y visualmente atractiva que permita:
                  </p>
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {[
                      'Exhibir proyectos con alto impacto visual.',
                      'Presentar productos y servicios de forma clara.',
                      'Generar contactos mediante formularios y WhatsApp.',
                      'Posicionar la marca como referente en su rubro.'
                    ].map((text, idx) => (
                      <div key={idx} className="bg-[#f9fafb] p-3 rounded-lg border border-[#f3f4f6] flex gap-3 items-center">
                        <div className="w-2 h-2 bg-[#125b69] rounded-full"></div>
                        <span className="text-sm text-[#374151]">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="page-break"></div>

            {/* ALCANCE Y DISEÑO (Section 2) */}
            <div className="export-section pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {/* 3. Alcance del Proyecto */}
                <div className="bg-[#0a363e] text-[#ffffff] rounded-2xl p-8 relative overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ffffff] opacity-5 rounded-full blur-2xl"></div>
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="bg-[#ffffff1a] p-2 rounded-lg text-[#f1b51c]">
                      <Box className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">3. Alcance del Proyecto</h2>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-[#f1b51c] font-semibold text-sm mb-3 uppercase tracking-wider">Secciones Incluidas:</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Inicio', 'Productos', 'Servicios', 'Proyectos', 'Blog', 'Distribuidores', 'Franquicias', 'Contacto'].map(s => (
                        <span key={s} className="px-3 py-1 bg-[#ffffff1a] rounded-full text-xs">{s}</span>
                      ))}
                    </div>

                    <h3 className="text-[#f1b51c] font-semibold text-sm mb-3 uppercase tracking-wider">Funcionalidades Clave:</h3>
                    <ul className="space-y-2 text-sm text-[#e5e7eb]">
                      <li className="flex items-center gap-2">✔ Diseño responsive (móvil y tablet)</li>
                      <li className="flex items-center gap-2">✔ Integración con WhatsApp y Formularios</li>
                      <li className="flex items-center gap-2">✔ Galería de imágenes optimizadas</li>
                      <li className="flex items-start gap-2">✔ Fichas de productos completas (Imágenes, medidas, visualización 3D*)</li>
                      <li className="flex items-center gap-2">✔ Blog funcional + Carga inicial</li>
                      <li className="flex items-center gap-2">✔ Optimización básica SEO y Velocidad</li>
                    </ul>
                    <p className="text-xs text-[#9ca3af] mt-2 italic">*Si el cliente provee el material 3D.</p>
                  </div>
                </div>

                {/* 4. Propuesta de Diseño & Tiempos */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                        <Palette className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-bold text-[#111827]">4. Propuesta de Diseño</h2>
                    </div>
                    <ul className="mt-3 space-y-3 text-sm text-[#4b5563]">
                      {[
                        'Estética moderna pero sólida (equilibrio entre innovación y lo tradicional).',
                        'Uso estratégico de colores (rojo, gris, blanco + acentos dinámicos de la marca).',
                        'Mayor riqueza visual para evitar sensación de “vacío”.',
                        'Enfoque visual atractivo pero dirigido a un público adulto corporativo.'
                      ].map((t, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#f1b51c] mt-1.5"></div>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#fefce8] border border-[#fef9c3] p-5 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-6 w-6 text-[#f1b51c]" />
                      <h2 className="text-lg font-bold text-[#111827]">Tiempo de Entrega</h2>
                    </div>
                    <p className="text-2xl font-bold text-[#125b69] mb-1">4 semanas</p>
                    <p className="text-xs text-[#6b7280]">* El tiempo puede ajustarse según la rapidez en la entrega de contenido por parte del cliente.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="page-break"></div>

            {/* PROCESO DE TRABAJO (Section 3) */}
            <div className="export-section pt-8">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                    <Settings className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#111827]">5. Proceso de Trabajo</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { n: 1, t: 'Recolección', d: ['• Recepción de contenido.', '• Definición de estructura.'] },
                    { n: 2, t: 'Propuesta de Diseño', d: ['• Estructura + estilo visual.', '• Ajustes según feedback.'] },
                    { n: 3, t: 'Desarrollo Web', d: ['• Implementación en WordPress.', '• Visualización en vivo.'] },
                    { n: 4, t: 'Carga de Contenido', d: ['• Integración de productos.', '• Proyectos y blog.'] },
                    { n: 5, t: 'Revisión Final', d: ['• Ajustes de detalles.', '• Correcciones pre-entrega.'] },
                    { n: 6, t: 'Lanzamiento', d: ['• Web publicada y funcional.', '• Capacitación de uso.'] }
                  ].map(step => (
                    <div key={step.n} className="bg-[#ffffff] border border-[#f3f4f6] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] rounded-xl p-5 relative hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] transition-shadow">
                      <div className="w-10 h-10 bg-[#f0f7f8] text-[#125b69] rounded-full flex items-center justify-center font-bold text-lg mb-4">{step.n}</div>
                      <h3 className="font-bold text-[#111827] mb-2">{step.t}</h3>
                      <ul className="text-sm text-[#4b5563] space-y-1">
                        {step.d.map((line, idx) => <li key={idx}>{line}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="page-break"></div>

            {/* REVISIONES, SOPORTE & INVERSION (Section 4) */}
            <div className="export-section pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* 7. Revisiones */}
                <div className="bg-[#f9fafb] p-6 rounded-2xl border border-[#f3f4f6]">
                  <div className="flex items-center gap-2 mb-4">
                    <RefreshCw className="h-6 w-6 text-[#125b69]" />
                    <h2 className="text-xl font-bold text-[#111827]">7. Revisiones</h2>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-[#dcfce7] text-[#166534] text-xs px-2 py-1 rounded font-bold mb-2">INCLUYE</span>
                    <p className="text-sm text-[#4b5563]">Hasta 3 rondas de ajustes sobre el diseño y estructura inicial.</p>
                  </div>
                  <div>
                    <span className="inline-block bg-[#fee2e2] text-[#991b1b] text-xs px-2 py-1 rounded font-bold mb-2">NO INCLUYE</span>
                    <p className="text-sm text-[#4b5563]">Cambios estructurales grandes una vez aprobado el diseño (estos pueden cotizarse adicionalmente).</p>
                  </div>
                </div>

                {/* 8. Soporte */}
                <div className="bg-[#f9fafb] p-6 rounded-2xl border border-[#f3f4f6]">
                  <div className="flex items-center gap-2 mb-4">
                    <LifeBuoy className="h-6 w-6 text-[#125b69]" />
                    <h2 className="text-xl font-bold text-[#111827]">8. Soporte</h2>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-[#dcfce7] text-[#166534] text-xs px-2 py-1 rounded font-bold mb-2">INCLUYE</span>
                    <p className="text-sm text-[#4b5563]">30 días de soporte post-entrega (no prioritario). Correcciones menores y asistencia básica.</p>
                  </div>
                  <div>
                    <span className="inline-block bg-[#dbeafe] text-[#1e40af] text-xs px-2 py-1 rounded font-bold mb-2">OPCIONAL (Plan Mensual)</span>
                    <p className="text-sm text-[#4b5563]">Actualización de plugins, seguridad básica, cambios menores y soporte continuo.</p>
                  </div>
                </div>
              </div>

              {/* 9. INVERSIÓN */}
              <div className="bg-[#ffffff] border-2 border-[#125b69] rounded-2xl overflow-hidden mb-12 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] relative">
                <div className="absolute top-0 right-0 bg-[#f1b51c] text-[#ffffff] text-xs font-bold px-4 py-1 rounded-bl-lg">OFERTA ESPECIAL</div>
                <div className="p-8 md:p-10 text-center">
                  <h2 className="text-2xl font-bold text-[#111827] mb-2">9. Inversión del Proyecto</h2>
                  <p className="text-[#6b7280] mb-8">Desarrollo integral de plataforma web corporativa.</p>
                  
                  <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8">
                    <div className="opacity-60 line-through">
                      <p className="text-sm uppercase tracking-wide font-semibold text-[#6b7280]">Precio Regular</p>
                      <p className="text-3xl font-bold text-[#9ca3af]">3000 Bs</p>
                    </div>
                    <div className="text-[#125b69] transform scale-110">
                      <p className="text-sm uppercase tracking-wide font-bold text-[#125b69]">Precio Especial *</p>
                      <p className="text-5xl font-extrabold text-[#0a363e]">2500 Bs</p>
                    </div>
                  </div>

                  <div className="bg-[#f9fafb] inline-block px-6 py-3 rounded-xl border border-[#e5e7eb]">
                    <p className="text-sm font-semibold text-[#374151] uppercase mb-1">Forma de Pago</p>
                    <div className="flex gap-4 text-sm text-[#4b5563]">
                      <span><strong className="text-[#125b69] text-lg">50%</strong> al iniciar</span>
                      <span className="text-[#d1d5db]">|</span>
                      <span><strong className="text-[#125b69] text-lg">50%</strong> al finalizar</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#9ca3af] mt-4">* Precio especial aplicado por relación cercana.</p>
                </div>
              </div>
            </div>

            <div className="page-break"></div>

            {/* CONSIDERACIONES (Section 5) */}
            <div className="export-section pt-8">
              <div className="border-t border-[#f3f4f6] pt-8">
                <h2 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#9ca3af]" />
                  Consideraciones Finales
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#4b5563]">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#9ca3af] mt-0.5 flex-shrink-0" />
                    Hosting y dominio son gestionados por el cliente.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#9ca3af] mt-0.5 flex-shrink-0" />
                    El cliente debe proporcionar el contenido necesario (textos e imágenes).
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#9ca3af] mt-0.5 flex-shrink-0" />
                    Retrasos en la entrega del contenido pueden afectar el tiempo final.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#9ca3af] mt-0.5 flex-shrink-0" />
                    Funcionalidades fuera del alcance establecido se cotizan adicionalmente.
                  </li>
                </ul>
              </div>

              {/* Signature / Footer */}
              <footer className="mt-16 pt-8 border-t border-[#f3f4f6] flex flex-col md:flex-row justify-between items-center text-sm text-[#6b7280]">
                <p>© {new Date().getFullYear()} KODO - Desarrollo Web. Todos los derechos reservados.</p>
                <p className="mt-2 md:mt-0 font-medium flex items-center gap-4">
                  <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> villcuellar99@gmail.com</span>
                  <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> +591 78567545</span>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
