import React from 'react'
import Image from 'next/image'
import { Users, Award, Globe, Lightbulb } from 'lucide-react'

export default function Page() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
                {/* Hero Section */}
                <div className="relative w-full h-[500px] bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: "url('/home_img/about5.webp')" }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center px-4">
                            <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">Historia de Proplayas</h1>
                            <p className="text-white/90 text-xl md:text-2xl font-light">Preservando nuestras costas desde 2004</p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 text-center border border-gray-200 dark:border-zinc-700">
                            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">90</div>
                            <div className="text-gray-600 dark:text-gray-400">Nodos Activos</div>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 text-center border border-gray-200 dark:border-zinc-700">
                            <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">17</div>
                            <div className="text-gray-600 dark:text-gray-400">Países</div>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 text-center border border-gray-200 dark:border-zinc-700">
                            <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">20+</div>
                            <div className="text-gray-600 dark:text-gray-400">Años de Experiencia</div>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 text-center border border-gray-200 dark:border-zinc-700">
                            <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lightbulb className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">4</div>
                            <div className="text-gray-600 dark:text-gray-400">Tipos de Nodos</div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    {/* Historia Section */}
                    <div className="mb-20">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Nuestra Historia</h2>
                        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            <p className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700">La Red PROPLAYAS se originó en <span className="font-semibold text-blue-600 dark:text-blue-400">2004</span>, en el II Simposio VARAPLAYAS en Varadero,
                                Cuba, donde expertos de varios países iberoamericanos reconocieron la necesidad de
                                una gestión integrada y sostenible de las playas, frente a su creciente degradación
                                ambiental y cultural debido al turismo intensivo. A partir de este encuentro, se estableció
                                un marco de cooperación que permitió un intercambio continuo de conocimientos y
                                experiencias. Alfredo Cabrera (Cuba), Gladys Perez (México) y Aramys Latchinian
                                (Uruguay).</p>
                            <p className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700">Formalmente constituida en <span className="font-semibold text-blue-600 dark:text-blue-400">2007</span> durante un taller en Tulum (México), bajo la
                                coordinación de MSc Gladys Pérez de la Fuente donde se tuvo la participación de Dr. J
                                Alfredo Cabrera, Cuba, Dr. Aramis Latchinian, Uruguay, Dr. Alvaro Morales, Costa Rica,
                                Dr. Sergio Mattos, Brasil, Dr. Johon Jairo Gutiérrez, Colombia, Biol. Ana Laura Monserrat,
                                Argentina, Dr. Omar Cervantes, México, Dr. José Mariscal Romera, México, Dr. Roberto
                                Cañamero, Perú, Ma. Cecilia Castaño, Colombia y el Dr. Paul Geerders, Holanda (Q.E.P.D).
                                La Red ha evolucionado para consolidar metodologías y prácticas en la gestión de
                                playas, integrando el conocimiento científico con el saber local. En sus primeros años, los
                                nodos de la Riviera Maya en México, Santa Marta Colombia, Varadero Cuba, jugaron un
                                papel fundamental, desarrollando actividades de capacitación y divulgación científica. Se
                                destaca la vinculación y participación de Enzo Pranzini (Italia) por sus valiosos aportes
                                desde el análisis de la erosión costera.</p>
                            <p className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700">En <span className="font-semibold text-blue-600 dark:text-blue-400">2012</span>, la coordinación de la Red se trasladó a Santa Marta, Colombia, con el Dr.
                                Camilo Botero Saltaren, marcando un crecimiento significativo que amplió la red a 54
                                nodos en 17 países para 2019. Desde entonces, se han organizado cursos, congresos y
                                eventos de limpieza de playas, reforzando su presencia y promoviendo la conservación de
                                estos espacios.</p>
                            <p className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700">Actualmente La Red PROPLAYAS cuenta con <span className="font-semibold text-blue-600 dark:text-blue-400">90 Nodos</span> de tipo empresarial, científicos y
                                activistas. Así la Red es reconocida no solo por su enfoque académico, sino también por
                                su capacidad de articular esfuerzos de diversos sectores: sociedad civil, empresas,
                                instituciones públicas y entidades académicas. Así, ha logrado un impacto concreto en la
                                gestión de playas de Iberoamérica, con un enfoque en la certificación, conservación y
                                manejo sostenible de estos ecosistemas esenciales.</p>
                        </div>
                    </div>

                    {/* Líderes y Fundadores Section */}
                    <div className="mb-20">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">Líderes y Fundadores</h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                            Conoce a las personas que han guiado la Red PROPLAYAS a lo largo de los años
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {/* Placeholder 1 */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 mb-4 flex items-center justify-center shadow-xl">
                                    <Users className="w-16 h-16 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-center">Líder 1</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Coordinador</p>
                            </div>
                            {/* Placeholder 2 */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 mb-4 flex items-center justify-center shadow-xl">
                                    <Users className="w-16 h-16 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-center">Líder 2</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Co-fundador</p>
                            </div>
                            {/* Placeholder 3 */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 mb-4 flex items-center justify-center shadow-xl">
                                    <Users className="w-16 h-16 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-center">Líder 3</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Asesor</p>
                            </div>
                            {/* Placeholder 4 */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-600 dark:to-orange-800 mb-4 flex items-center justify-center shadow-xl">
                                    <Users className="w-16 h-16 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-center">Líder 4</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Director</p>
                            </div>
                            {/* Placeholder 5 */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 dark:from-pink-600 dark:to-pink-800 mb-4 flex items-center justify-center shadow-xl">
                                    <Users className="w-16 h-16 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-center">Líder 5</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Consejero</p>
                            </div>
                        </div>
                    </div>

                    {/* Estructura Organizacional Section */}
                    <div className="mb-20">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Estructura Organizacional</h2>
                        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            <p className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700">La estructura organizacional de la Red PROPLAYAS se basa en un sistema de nodos
                                locales autónomos, distribuidos en varios países, con una coordinación central que opera
                                con sede en el país del cual sea el coordinador: Alfredo Cabrera (Varadero - Cuba)
                                Coordinador 2007-2012, Camilo Botero Saltaren (Santa Marta Colombia), Coordinador
                                2012-2021, Omar Dario Cervantes (Manzanillo – México), Coordinador 2021-2023,
                                Nubia Garzón Barrero (Montería Colombia) Coordinadora 2021-2025. Esta organización
                                permite una integración descentralizada y colaborativa entre diferentes actores
                                interesados en la gestión sostenible de playas.</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-blue-600 dark:bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">1</div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nodos Locales</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">Son la base de la Red y representan grupos de trabajo
                                        autónomos que se auto-organizan y desempeñan funciones según sus
                                        capacidades y áreas de actuación, como educación, investigación, asesoría
                                        técnica y gestión de playas.</p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-green-600 dark:bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">2</div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tipos de Nodos</h3>
                                    </div>
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                        <li className="flex items-start"><span className="text-green-600 dark:text-green-400 mr-2">•</span><span><strong>Sociedad Civil:</strong> Sensibilización y movilización social</span></li>
                                        <li className="flex items-start"><span className="text-green-600 dark:text-green-400 mr-2">•</span><span><strong>Empresariales:</strong> Consultores expertos en ecosistemas costeros</span></li>
                                        <li className="flex items-start"><span className="text-green-600 dark:text-green-400 mr-2">•</span><span><strong>Académicos:</strong> Investigadores y generadores de conocimiento</span></li>
                                        <li className="flex items-start"><span className="text-green-600 dark:text-green-400 mr-2">•</span><span><strong>Función Pública:</strong> Funcionarios de gestión pública</span></li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-purple-600 dark:bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">3</div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Consejo de Coordinación</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">Órgano central que organiza,
                                        supervisa y apoya la actividad de los nodos, así como fomenta la
                                        colaboración entre ellos. Cada nodo tiene libertad para gestionar sus actividades de manera independiente.</p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-orange-600 dark:bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">4</div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Proyectos Colaborativos (PCBC)</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">Esquema que permite que un
                                        nodo (Nodo Fuente) proponga un proyecto que otros nodos puedan adoptar y
                                        adaptar a sus contextos locales, promoviendo la cooperación regional e internacional.</p>
                                </div>
                            </div>

                            <p className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 mt-6">
                                La estructura de consejo de coordinación que inició a operar desde el año <span className="font-semibold text-blue-600 dark:text-blue-400">2021</span> fue
                                integrada por: Gloria Lopez (Nodo C20 Colombia), Alfredo Cabrera (Nodo C14
                                Costatenas Cuba), Paloma Arias (Nodo A61 IEMAR São Pedro da Aldeia – RJ –
                                Brasil), Gladys Perez (Nodo A02 Riviera Maya - México), Serafi Mercade (Nodo E37
                                Beach Trotters, Torredembara – España), Camilo Botero (Nodo E07 Sistemas Costeros)
                                y cuyo coordinador fue Omar Cervantes (Nodo C24 Bikimi - México), actualmente este
                                consejo actúa como órgano asesor.
                            </p>
                        </div>
                    </div>

                    {/* Consejo Asesor Section */}
                    <div className="mb-20">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">Consejo Asesor 2023-2025</h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                            Nuestro consejo asesor actual está conformado por expertos de diversos países
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        YV
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Yunior Ramón Velázquez Labrada</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Consejero</p>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Nodo C44 CEMZOC-UO-CUBA</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 break-all">yvlabrada@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        HH
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Hugo Hidalgo Conlindres</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Consejero</p>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Nodo Cariguat C-46 (Guatemala)</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 break-all">pedrerasbelnarval@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        MP
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Marcus Polette</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Consejero</p>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Itajaí - Santa Catarina (Brasil)</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 break-all">mpolette@univali.br</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        MA
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Mario Alberto Palacios</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Consejero</p>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Nodo C49 ECUPAC (Ecuador)</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 break-all">mario.palacios@upacifico.edu.ec</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        LP
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Luana Portz</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Consejera</p>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Nodo C26 UFRGS (Brasil)</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 break-all">luanaportz@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border-2 border-blue-500 dark:border-blue-400 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        NG
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Nubia Mireya Garzón Barrero</h3>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-semibold">Consejera y Coordinadora</p>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Nodo C23 (Montería, Colombia)</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 break-all">nubiagarzonbarrero@yahoo.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
