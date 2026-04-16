import { useRef, useState } from 'react';
import { FileText, Presentation, Loader2, Lightbulb, Zap, Box, Palette, Clock, Settings, RefreshCw, LifeBuoy, Info, Check, Mail, Phone, ShoppingCart } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import pptxgen from 'pptxgenjs';
import html2canvas from 'html2canvas';

export default function FishQuotationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!containerRef.current) return;
    setIsExporting(true);

    const element = containerRef.current;
    const opt: any = {
      margin: [10, 0, 10, 0],
      filename: 'Propuesta_KODO_Empresa_Pescados.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        onclone: (clonedDoc: Document) => {
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

      await pres.writeFile({ fileName: 'Propuesta_KODO_Empresa_Pescados.pptx' });
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
        <div 
          id="propuesta-container" 
          ref={containerRef}
          className="bg-[#ffffff] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] rounded-2xl overflow-hidden print-border relative"
        >
          <div className="h-3 w-full" style={{ background: 'linear-gradient(to right, #125b69, #f1b51c)' }}></div>

          <div className="p-8 md:p-12">
            
            <div className="export-section">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#f3f4f6] pb-10 mb-10">
                <div className="mb-6 md:mb-0">
                  <div className="relative w-40 h-16 mb-4 flex items-center">
                    <span className="text-4xl font-bold text-[#125b69] tracking-tighter">K<span className="text-[#f1b51c]">Ō</span>DO</span>
                  </div>
                  <h1 className="text-3xl font-bold text-[#111827] mb-1 italic">Propuesta de Diseño y Desarrollo Web</h1>
                  <p className="text-[#125b69] font-medium tracking-wide uppercase text-sm">KODO — Desarrollo Web</p>
                </div>
                <div className="text-left md:text-right bg-[#f0f7f8] p-4 rounded-xl">
                  <p className="text-sm text-[#6b7280] mb-1 italic">Preparado para:</p>
                  <p className="text-xl font-bold text-[#111827]">Empresa de pescados</p>
                  <p className="text-sm text-[#6b7280] mt-2 flex items-center justify-start md:justify-end gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-[#111827]">1. Introducción</h2>
                  </div>
                  <p className="text-[#4b5563] leading-relaxed mb-4 text-sm">
                    En KODO, el enfoque no es solo desarrollar una página web, sino construir una herramienta digital que represente correctamente la calidad del negocio y facilite la generación de ventas y contactos.
                  </p>
                  <p className="text-[#4b5563] leading-relaxed text-sm">
                    Para este proyecto, el objetivo es crear una web moderna, funcional y atractiva que permita no solo mostrar los productos, sino también impulsar la compra directa y generar valor a través de contenido.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-[#111827]">2. Objetivo del Proyecto</h2>
                  </div>
                  <p className="text-[#4b5563] leading-relaxed text-sm mb-4 italic">
                    Desarrollar una página web corporativa con funcionalidades de catálogo y venta que permita:
                  </p>
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    {[
                      'Mostrar productos de forma atractiva',
                      'Implementar un sistema de compra sencillo',
                      'Publicar contenido de valor (recetas)',
                      'Destacar promociones semanales',
                      'Generar confianza y presencia digital'
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

            <div className="export-section pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div className="bg-[#0a363e] text-[#ffffff] rounded-2xl p-8 relative overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ffffff] opacity-5 rounded-full blur-2xl"></div>
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="bg-[#ffffff1a] p-2 rounded-lg text-[#f1b51c]">
                      <Box className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">3. Alcance del Proyecto</h2>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-[#f1b51c] font-semibold text-xs mb-3 uppercase tracking-wider">Secciones Incluidas:</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Inicio', 'Productos (catálogo)', 'Recetas (blog)', 'Sobre la empresa', 'Contacto'].map(s => (
                        <span key={s} className="px-3 py-1 bg-[#ffffff1a] rounded-full text-[10px] font-bold uppercase">{s}</span>
                      ))}
                    </div>

                    <h3 className="text-[#f1b51c] font-semibold text-xs mb-3 uppercase tracking-wider">Funcionalidades:</h3>
                    <ul className="grid grid-cols-1 gap-1.5 text-xs text-[#e5e7eb]">
                      <li className="flex items-center gap-2">✔ Diseño responsive</li>
                      <li className="flex items-center gap-2">✔ Banner dinámico (Banner/Video)</li>
                      <li className="flex items-center gap-2">✔ Catálogo de productos</li>
                      <li className="flex items-center gap-2">✔ Sistema de carrito de compras</li>
                      <li className="flex items-center gap-2">✔ Integración de pagos mediante QR</li>
                      <li className="flex items-center gap-2">✔ Blog de recetas funcional</li>
                      <li className="flex items-center gap-2">✔ Formularios de contacto</li>
                      <li className="flex items-center gap-2">✔ Integración con WhatsApp</li>
                      <li className="flex items-center gap-2">✔ Optimización básica SEO</li>
                      <li className="flex items-center gap-2">✔ Optimización de velocidad</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                        <Palette className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-bold text-[#111827]">4. Propuesta de Diseño</h2>
                    </div>
                    <p className="text-xs text-[#6b7280] mb-4 italic">El diseño se desarrollará tomando como referencia el estilo de la página proporcionada, adaptándolo a la identidad del negocio:</p>
                    <ul className="mt-3 space-y-3 text-sm text-[#4b5563]">
                      {[
                        'Estética moderna y limpia',
                        'Enfoque visual en producto (imágenes atractivas)',
                        'Uso de recursos visuales dinámicos',
                        'Navegación clara y amigable'
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
                      <h2 className="text-lg font-bold text-[#111827]">6. Tiempo de Entrega</h2>
                    </div>
                    <p className="text-2xl font-bold text-[#125b69] mb-1">4 a 5 semanas</p>
                    <p className="text-xs text-[#6b7280] italic">* Tiempo estimado basado en la complejidad del catálogo y checkout.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="page-break"></div>

            <div className="export-section pt-8">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                    <Settings className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#111827]">5. Proceso de Trabajo</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { n: 1, t: 'Recolección', d: 'Recepción de información.' },
                    { n: 2, t: 'Diseño', d: 'Propuesta visual.' },
                    { n: 3, t: 'Desarrollo', d: 'Implementación web.' },
                    { n: 4, t: 'Tienda', d: 'Implementación del carrito.' },
                    { n: 5, t: 'Contenido', d: 'Carga de productos.' },
                    { n: 6, t: 'Revisión', d: 'Ajustes finales.' },
                    { n: 7, t: 'Entrega', d: 'Publicación final.' }
                  ].map(step => (
                    <div key={step.n} className="bg-[#ffffff] border border-[#f3f4f6] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] rounded-xl p-4 relative text-center">
                      <div className="w-8 h-8 bg-[#f0f7f8] text-[#125b69] rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">{step.n}</div>
                      <h3 className="font-bold text-[#111827] text-sm mb-1">{step.t}</h3>
                      <p className="text-[10px] text-[#6b7280]">{step.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="page-break"></div>

            <div className="export-section pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-[#f9fafb] p-6 rounded-2xl border border-[#f3f4f6]">
                  <div className="flex items-center gap-2 mb-4">
                    <RefreshCw className="h-6 w-6 text-[#125b69]" />
                    <h2 className="text-xl font-bold text-[#111827]">7. Revisiones</h2>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-[#dcfce7] text-[#166534] text-xs px-2 py-1 rounded font-bold mb-2 uppercase">Incluye:</span>
                    <p className="text-sm text-[#4b5563]">Hasta 3 rondas de ajustes.</p>
                  </div>
                  <div>
                    <span className="inline-block bg-[#fee2e2] text-[#991b1b] text-xs px-2 py-1 rounded font-bold mb-2 uppercase">No incluye:</span>
                    <p className="text-sm text-[#4b5563]">Cambios estructurales posteriores a la aprobación.</p>
                  </div>
                </div>

                <div className="bg-[#f9fafb] p-6 rounded-2xl border border-[#f3f4f6]">
                  <div className="flex items-center gap-2 mb-4">
                    <LifeBuoy className="h-6 w-6 text-[#125b69]" />
                    <h2 className="text-xl font-bold text-[#111827]">8. Soporte</h2>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-[#dcfce7] text-[#166534] text-xs px-2 py-1 rounded font-bold mb-2 uppercase">Incluye:</span>
                    <p className="text-sm text-[#4b5563]">30 días de soporte post-entrega.</p>
                  </div>
                  <div>
                    <span className="inline-block bg-[#dbeafe] text-[#1e40af] text-xs px-2 py-1 rounded font-bold mb-2 uppercase">Opcional:</span>
                    <p className="text-sm text-[#4b5563]">Servicio de mantenimiento mensual.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#ffffff] border-2 border-[#125b69] rounded-2xl overflow-hidden mb-12 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] relative">
                <div className="absolute top-0 right-0 bg-[#f1b51c] text-[#ffffff] text-xs font-bold px-4 py-1 rounded-bl-lg">OFERTA ESPECIAL</div>
                <div className="p-8 md:p-10 text-center">
                  <h2 className="text-2xl font-bold text-[#111827] mb-2">9. Inversión del Proyecto</h2>
                  <p className="text-xs text-[#6b7280] mb-8 italic">(Segun complejidad final del carrito y pagos QR)</p>
                  
                  <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-8">
                    <div className="text-[#125b69] transform scale-110 flex flex-col items-center">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#125b69] mb-1">Inversión Final</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-5xl font-extrabold text-[#0a363e]">3200</p>
                        <p className="text-xl font-bold text-[#f1b51c]">Bs</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f9fafb] inline-block px-8 py-4 rounded-2xl border border-[#e5e7eb] shadow-sm">
                    <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest mb-2">Forma de Pago</p>
                    <div className="flex gap-6 text-sm">
                      <div className="text-[#4b5563]"><strong className="text-[#125b69] text-lg block">50%</strong> Inicio</div>
                      <div className="w-px bg-[#e5e7eb]"></div>
                      <div className="text-[#4b5563]"><strong className="text-[#125b69] text-lg block">50%</strong> Entrega</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="page-break"></div>

            <div className="export-section pt-8">
              <div className="border-t border-[#f3f4f6] pt-8">
                <h2 className="text-lg font-bold text-[#111827] mb-6 flex items-center gap-2 italic">
                  <Info className="h-5 w-5 text-[#f1b51c]" />
                  10. Consideraciones Finales
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs text-[#4b5563]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#125b69] font-bold">•</span>
                    Dominio ya disponible.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#125b69] font-bold">•</span>
                    Hosting no incluido.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#125b69] font-bold">•</span>
                    Contenido (textos/imágenes) proporcionado por el cliente.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#125b69] font-bold">•</span>
                    Integraciones externas dependen de disponibilidad técnica.
                  </li>
                  <li className="flex items-start gap-2 md:col-span-2 italic">
                    <span className="text-[#f1b51c] font-bold">Nota:</span>
                    Funcionalidades adicionales fuera del alcance se cotizan aparte.
                  </li>
                </ul>
              </div>
            </div>

            <div className="page-break"></div>

              <div className="export-section pt-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#f0f7f8] p-2 rounded-lg text-[#125b69]">
                      <RefreshCw className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#111827]">11. Mantenimiento Mensual (Opcional)</h2>
                  </div>
                  <p className="text-sm text-[#4b5563] leading-relaxed mb-8">
                    Para garantizar el correcto funcionamiento, seguridad y actualización de la página web, se ofrece un servicio de mantenimiento mensual.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-[#f9fafb] p-6 rounded-2xl border border-[#f3f4f6]">
                      <h3 className="text-[#125b69] font-bold text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Check className="h-4 w-4" /> Incluye:
                      </h3>
                      <ul className="space-y-2 text-xs text-[#4b5563]">
                        <li>• Actualización de WordPress y plugins</li>
                        <li>• Revisión técnica general del sitio</li>
                        <li>• Soporte continuo</li>
                        <li>• Corrección de errores menores</li>
                      </ul>
                      <h3 className="text-[#f1b51c] font-bold text-sm mt-6 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Zap className="h-4 w-4" /> Actualización de contenido:
                      </h3>
                      <ul className="space-y-2 text-xs text-[#4b5563]">
                        <li>• Cambio semanal de banner en portada (imagen o video)</li>
                        <li>• Ajustes básicos de contenido según necesidad</li>
                      </ul>
                    </div>

                    <div className="bg-[#fef2f2] p-6 rounded-2xl border border-[#fee2e2]">
                      <h3 className="text-[#991b1b] font-bold text-sm mb-4 uppercase tracking-wider">No incluye:</h3>
                      <ul className="space-y-2 text-xs text-[#4b5563]">
                        <li>• Nuevas funcionalidades</li>
                        <li>• Rediseño de secciones</li>
                        <li>• Desarrollo adicional</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#0a363e] rounded-2xl p-8 text-center text-[#ffffff] shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#125b69] opacity-20 transform translate-x-16 -translate-y-16 rounded-full"></div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#f1b51c] mb-2">Inversión Mensual</p>
                    <div className="flex justify-center items-baseline gap-2 mb-2">
                      <span className="text-5xl font-extrabold">300</span>
                      <span className="text-xl font-bold text-[#f1b51c]">Bs / mes</span>
                    </div>
                    <p className="text-[10px] text-[#9ca3af] italic">(dependiendo del nivel de soporte requerido)</p>
                  </div>
                </div>

                <footer className="mt-16 pt-8 border-t border-[#f3f4f6] flex flex-col md:flex-row justify-between items-center text-[10px] text-[#9ca3af] uppercase tracking-widest font-semibold">
                <p>© {new Date().getFullYear()} KODO — Agencia Creativa.</p>
                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> villcuellar99@gmail.com</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +591 78567545</span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
