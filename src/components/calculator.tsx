import React, { useState, useEffect, type JSX } from 'react'

type tipos = 'carroMoto' | 'moto' | 'carro'
const valorOriginalAula = 165
const custoAluguelPorVeiculo = 49.99;
const numeroParcelasMaximo = 12;
const numeroParcelasSemJuros = 1;

const taxas: Record<number, number> = {
    1: 3.51,
    2: 4.36,
    3: 5.15,
    4: 5.93,
    5: 6.72,
    6: 7.51,
    7: 8.86,
    8: 9.65,
    9: 10.43,
    10: 11.22,
    11: 12.00,
    12: 12.78,
    13: 13.57,
    14: 14.35,
    15: 15.14,
    16: 15.92,
    17: 16.70,
    18: 17.49
};

export default function Calculator() {
    const [numAulasMoto, setNumAulasMoto] = useState<number>(2)
    const [numAulasCarro, setNumAulasCarro] = useState<number>(2)
    const [tipo, setTipo] = useState<tipos>('carroMoto')
    const [valorTotal, setValorTotal] = useState<number>(0)
    const [valorTotalSemJuros, setValorTotalSemJuros] = useState<number>(0)
    const [valorPorAula, setValorPorAula] = useState<number>(0)
    const [valorAluguel, setValorAluguel] = useState<number>(0)
    const [valorAula, setValorAula] = useState<number>(valorOriginalAula)
    const [numeroParcelas, setNumeroParcelas] = useState<number>(numeroParcelasSemJuros)
    const [aulasTotaisSoma, setAulasTotaisSoma] = useState<number>(4)

    useEffect(() => {
        setNumAulasMoto(2)
        setNumAulasCarro(2)
    }, [tipo])

    useEffect(() => {
        calcularValorComDesconto()
    }, [numAulasMoto, numAulasCarro, tipo])

    useEffect(() => {
        if (numeroParcelas > numeroParcelasSemJuros) {
            const resultado = calcularValorComJuros(valorTotalSemJuros, numeroParcelas)
            setValorTotal(resultado)
        } else {
            setValorTotal(valorTotalSemJuros)
        }
    }, [numeroParcelas, valorTotalSemJuros])

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    const alterarAulas = (tip: tipos, valor: number) => {
        if (valor < 2) valor = 2
        if (tip === 'moto') {
            setNumAulasMoto(valor)
        } else if (tip === 'carro') {
            setNumAulasCarro(valor)
        }
    }

    function calcularValorComJuros(valor: number, parcelas: number) {
        return taxas[parcelas] ? valor * (1 + taxas[parcelas] / 100) : valor;
    }

    const RenderInputs = () => {
        if (!tipo) return null;

        const tiposInput: tipos[] = [];
        if (tipo === 'carro') tiposInput.push('carro');
        if (tipo === 'moto') tiposInput.push('moto');
        if (tipo == 'carroMoto') {
            tiposInput.push('carro');
            tiposInput.push('moto');
        }

        return (
            <div className='mt-4 flex flex-col gap-3'>
                {
                    tiposInput.map((t) => (
                        <div className='flex flex-col gap-2' key={t}>
                            <div className='flex flex-col items-start gap-3 rounded-md border border-[#0f172a]/15 bg-white p-3 min-[460px]:flex-row min-[460px]:items-center min-[460px]:justify-between md:p-4'>
                                <h1 className='text-pretty text-sm font-semibold uppercase tracking-[0.08em] text-[#0c1327] md:text-base'>
                                    Aulas de {t === 'carro' ? 'Carro' : 'Moto'}: <span className='text-[#0619dd]'>{t == 'carro' ? numAulasCarro : numAulasMoto}</span>
                                </h1>

                                <div className='flex gap-2'>
                                    <button className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-black bg-[#ffcb00] p-2 text-xl font-bold text-black transition hover:bg-[#ffd633]' onClick={() => alterarAulas(t, t == 'carro' ? numAulasCarro - 1 : numAulasMoto - 1)}>âˆ’</button>
                                    <button className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-black bg-[#ffcb00] p-2 text-xl font-bold text-black transition hover:bg-[#ffd633]' onClick={() => alterarAulas(t, t == 'carro' ? numAulasCarro + 1 : numAulasMoto + 1)}>+</button>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        );
    };

    const calcularValorComDesconto = () => {
        let aulasTotais = 0;
        let valorAluguel = calcularCustoAluguel();
        let valorAulaLocal = 100;

        if (tipo) {
            if (tipo === 'carro') {
                aulasTotais = numAulasCarro;
            } else if (tipo === 'moto') {
                aulasTotais = numAulasMoto;
            } else if (tipo === 'carroMoto') {
                aulasTotais = numAulasCarro + numAulasMoto;
            }
        }

        if (aulasTotais > 3 && aulasTotais < 10) {
            valorAulaLocal = 100;
        }
        else if (aulasTotais >= 10 && aulasTotais < 15) {
            valorAulaLocal = 90;
        }
        else if (aulasTotais >= 15 && aulasTotais < 20) {
            valorAulaLocal = 85;
            valorAluguel = valorAluguel / 2 - 0.01;
        }
        else if (aulasTotais >= 20) {
            valorAulaLocal = 80;
            valorAluguel = 0;
        } else {
            valorAulaLocal = valorOriginalAula;
            valorAluguel = calcularCustoAluguel();
        }
        setAulasTotaisSoma(aulasTotais)
        const valorT = ((aulasTotais * valorAulaLocal) + valorAluguel)
        setValorAula(valorAulaLocal);
        setValorTotalSemJuros(valorT);
        setValorPorAula(aulasTotais > 0 ? (valorT - valorAluguel) / aulasTotais : 0);
        setValorAluguel(valorAluguel);
    }


    const calcularCustoAluguel = () => {
        if (tipo === 'carro' || tipo === 'moto') {
            return custoAluguelPorVeiculo
        }

        return custoAluguelPorVeiculo * 2 + 0.01
    }

    const DivDescontoAula = () => {
        return (
            <div className="relative mt-4 flex min-h-20 items-center justify-start overflow-hidden rounded-md border border-[#ffcb00]/35 bg-[#ffcb00]/15 p-4 md:mt-5 md:p-5">
                <div className="relative z-10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-4xl text-[#9a6b00] flex-shrink-0 md:text-5xl">
                        local_offer
                    </span>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f4800] md:text-sm">
                            Desconto Aplicado nas aulas
                        </span>
                        <span className="mt-1 text-lg font-bold text-black md:text-xl">
                            {descontoAula.toFixed(0)}% de desconto
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const DivDescontoVeiculo = () => {
        return (
            <div className="relative mt-4 flex min-h-20 items-center justify-start overflow-hidden rounded-md border border-[#0619dd]/30 bg-[#0619dd]/8 p-4 md:mt-5 md:p-5">
                <div className="relative z-10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#0619dd] text-4xl flex-shrink-0 md:text-5xl">
                        directions_car
                    </span>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#243b83] md:text-sm">
                            Desconto Aplicado no aluguel do(s) veÃ­culo(s)
                        </span>
                        <span className="mt-1 text-lg font-bold text-[#0c1327] md:text-xl">
                            {descontoAluguel.toFixed(0)}% de desconto
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const Detalhes = () => {
        return (
            <div className='h-full w-full rounded-md border border-[#0f172a]/15 bg-white p-4 md:p-5'>
                <h2 className='mb-4 text-base font-bold uppercase tracking-[0.08em] text-[#0c1327] md:text-lg'>O que estÃ¡ incluÃ­do:</h2>
                <ul className='flex list-disc flex-col space-y-2 list-inside text-sm text-slate-700 md:text-base'>
                    {tipo.toLocaleLowerCase().includes("carro") && <li>{numAulasCarro} x Aulas de Carro</li>}
                    {tipo.toLocaleLowerCase().includes("moto") && <li>{numAulasMoto} x Aulas de Moto</li>}
                    <li>VeÃ­culo incluso no exame prÃ¡tico</li>
                    <li>Agendamento feito por nÃ³s</li>
                    {aulasTotaisSoma >= 6 && <li>Base TeÃ³rica para Aprendizado Eficiente</li>}
                    {aulasTotaisSoma >= 8 && <>
                        <li>Processo 100% personalizado</li>
                        <li>Monitoramento de aprendizagem ESPECIAL</li>
                    </>}
                </ul>
            </div>
        )
    }

    const reset = () => {
        setNumAulasMoto(2)
        setNumAulasCarro(2)
        setValorAula(valorOriginalAula)
        setTipo('carroMoto')
        setNumeroParcelas(numeroParcelasSemJuros)
    }

    const enviarMensagem = () => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('ideal-conversion-event', {
                detail: {
                    event: 'calculator_submit',
                    source: 'planos-simulator',
                    tipo,
                    parcelas: numeroParcelas,
                    aulasCarro: numAulasCarro,
                    aulasMoto: numAulasMoto,
                    valorTotal,
                },
            }));
        }

        const mensagem = `OlÃ¡, gostaria de iniciar meu processo para tirar a CNH com o seguinte plano:%0A%0A` +
            `Tipo: ${tipo === 'carroMoto' ? 'Carro e Moto' : tipo === 'carro' ? 'Apenas Carro' : 'Apenas Moto'}%0A` +
            `NÃºmero de aulas de ${tipo === 'carroMoto' ? `carro: ${numAulasCarro}%0ANÃºmero de aulas de moto: ${numAulasMoto}%0A` : (tipo === 'carro' ? `carro: ${numAulasCarro}%0A` : `moto: ${numAulasMoto}%0A`)}` +
            `NÃºmero de parcelas: ${numeroParcelas}%0A` +
            `Valor Aproximado ${formatter.format(valorTotal)}%0A` +
            `${numeroParcelas > numeroParcelasSemJuros ? 'Com juros da maquininha inclusos!%0A%0A' : 'SEM JUROS%0A%0A'}` +
            `Por favor, me envie mais informaÃ§Ãµes sobre como proceder. Obrigado!`;
        window.open(`https://wa.me/5517997572900?text=${mensagem}`, '_blank');
    }

    const Buttons = () => {
        return (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-6'>
                <button className='w-full cursor-pointer rounded-md border border-[#0f172a]/30 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#0c1327] transition hover:bg-slate-100 md:py-4 md:text-base' onClick={() => reset()}>
                    Reiniciar
                </button>
                <button className='md:col-span-2 flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-black bg-[#ffcb00] px-4 py-3 text-black transition hover:bg-[#ffd633] md:py-4' onClick={() => enviarMensagem()}>
                    <span>Quero Iniciar Agora!</span>
                    <p className='text-xs text-black/90'>Leva menos de 2 minutos</p>
                </button>
            </div>
        )
    }

    const Part2 = () => (
        <div className='flex flex-col gap-3'>
            <h1 className='break-words text-3xl font-bold uppercase leading-tight text-[#050f93] sm:text-4xl md:text-5xl xl:text-6xl'>{formatter.format(valorTotal)}</h1>
            {numeroParcelas > 1 ? <p className='text-pretty text-sm leading-relaxed text-slate-600 md:text-base'>ou <span className='font-bold text-[#0619dd]'>{numeroParcelas}x</span> de <span className='font-bold text-[#0619dd]'>{formatter.format(valorTotal / numeroParcelas)}</span> <span className={valorTotal == valorTotalSemJuros ? 'font-bold text-green-700' : 'text-slate-600'}>{valorTotal == valorTotalSemJuros ? 'âœ“ SEM JUROS' : 'com juros'}</span></p> : <p className='text-sm font-medium text-slate-600 md:text-base'>Pagamento Ã  vista</p>}
            <details className='group mt-6 md:mt-8'>
                <summary className='flex cursor-pointer items-center justify-between gap-3 rounded-md border border-[#0f172a]/15 bg-slate-50 p-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-[#0c1327] transition hover:bg-slate-100 md:text-base'>
                    <div className='flex flex-1 gap-3 items-center'>
                        <span className="material-symbols-outlined group-open:rotate-90 transition-transform">
                            chevron_right
                        </span>
                        Como Ã© calculado o valor?
                    </div>
                </summary>
                <div className='border-l-4 border-[#0619dd] bg-slate-50 p-4 md:p-5'>
                    <h3 className='mb-1 text-xs font-bold uppercase tracking-[0.08em] text-slate-600 md:text-sm'>Valor por aula:</h3>
                    <h1 className='mb-4 text-2xl font-bold text-[#0619dd] md:text-3xl'>{formatter.format(valorPorAula)}</h1>
                    <h3 className='mb-1 text-xs font-bold uppercase tracking-[0.08em] text-slate-600 md:text-sm'>Aluguel do(s) veÃ­culo(s):</h3>
                    <h1 className='text-2xl font-bold text-[#0619dd] md:text-3xl'>{valorAluguel > 0 ? formatter.format(valorAluguel) : 'âœ“ GrÃ¡tis!'}
                        <p className='text-xs text-slate-700'>* O aluguel Ã© incluso no valor do plano!</p>
                        <p className="text-xs text-slate-700">
                            * O valor do aluguel incluÃ­do neste pacote Ã© vÃ¡lido apenas para o primeiro exame de cada categoria. Em caso de reprovaÃ§Ã£o, serÃ¡ necessÃ¡rio efetuar um novo pagamento do aluguel.
                        </p>
                    </h1>
                </div>
            </details>
            <details className='group mt-4 md:mt-6'>
                <summary className='flex cursor-pointer items-center justify-between gap-3 rounded-md border border-[#0f172a]/15 bg-slate-50 p-4 text-left text-sm font-semibold uppercase tracking-[0.08em] text-[#0c1327] transition hover:bg-slate-100 md:text-base'>
                    <div className='flex flex-1 gap-3 items-center'>
                        <span className="material-symbols-outlined group-open:rotate-90 transition-transform">
                            chevron_right
                        </span>
                        O que estÃ¡ incluso?
                    </div>
                </summary>
                <div className='border-l-4 border-[#0619dd] bg-slate-50 p-4 md:p-5'>
                    <Detalhes />
                    <p className='mt-4 text-xs text-slate-700 md:text-sm'>* Os valores nÃ£o incluem taxas e exames adicionais do Detran.</p>
                </div>
            </details>

            <Buttons />
        </div>
    )


    const descontoAluguelValor = calcularCustoAluguel() - valorAluguel;
    const temDescontoAluguel = descontoAluguelValor > 0;
    const descontoAluguel = descontoAluguelValor * 100 / calcularCustoAluguel();

    const testDescontoAula = valorOriginalAula - valorAula > 0 ? true : false;
    const descontoAula = (valorOriginalAula - valorAula) * 100 / valorOriginalAula;

    const MilestoneInfo = () => {
        let mensagem = '';
        let proximoMilestone = '';
        let aulasProximas = 0;

        if (aulasTotaisSoma < 4) {
            proximoMilestone = '39% de desconto';
            aulasProximas = 4 - aulasTotaisSoma;
            mensagem = `Faltam apenas ${aulasProximas} aula${aulasProximas > 1 ? 's' : ''} para vocÃª ganhar ${proximoMilestone}!`;
        } else if (aulasTotaisSoma >= 4 && aulasTotaisSoma < 10) {
            proximoMilestone = '45% de desconto';
            aulasProximas = 10 - aulasTotaisSoma;
            mensagem = `Faltam ${aulasProximas} aula${aulasProximas > 1 ? 's' : ''} para desbloqueiar ${proximoMilestone}!`;
        } else if (aulasTotaisSoma >= 10 && aulasTotaisSoma < 15) {
            proximoMilestone = '48% de desconto (+ aluguel reduzido)';
            aulasProximas = 15 - aulasTotaisSoma;
            mensagem = `Faltam ${aulasProximas} aula${aulasProximas > 1 ? 's' : ''} para desbloqueiar ${proximoMilestone}!`;
        } else if (aulasTotaisSoma >= 15 && aulasTotaisSoma < 20) {
            proximoMilestone = '51% de desconto (+ aluguel grÃ¡tis)';
            aulasProximas = 20 - aulasTotaisSoma;
            mensagem = `Faltam ${aulasProximas} aula${aulasProximas > 1 ? 's' : ''} para desbloqueiar ${proximoMilestone}!`;
        } else if (aulasTotaisSoma >= 20) {
            mensagem = 'âœ“ VocÃª desbloqueou o melhor desconto! 51% de desconto + Aluguel GrÃ¡tis!';
        }

        return (
            <div className="relative mt-4 flex min-h-20 items-center justify-start overflow-hidden rounded-md border border-green-700/30 bg-green-600/6 p-4 md:mt-5 md:p-5">
                <div className="relative z-10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-green-600 text-5xl flex-shrink-0">
                        trending_up
                    </span>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-800 md:text-sm">
                            PrÃ³ximo Milestone
                        </span>
                        <span className="text-pretty mt-1 text-sm font-semibold text-slate-900 md:text-base">
                            {mensagem}
                        </span>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className='flex w-full flex-col gap-6 rounded-md border border-[#0f172a]/15 bg-white p-5 md:p-8'>
            <div className='relative flex flex-col'>
            <p className='mb-6 text-2xl font-bold uppercase text-[#0c1327] md:text-3xl'>{`Escolha seu Plano`}</p>
                <div className='grid grid-cols-1 gap-3 min-[430px]:grid-cols-3 md:flex md:flex-row md:gap-3'>
                    <div key={'carroMoto'} className={tipo === 'carroMoto' ? 'flex min-h-[92px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-black bg-[#ffcb00] p-4 text-center text-black transition-all duration-300 md:p-5' : 'flex min-h-[92px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-[#0f172a]/20 bg-white p-4 text-center text-[#475569] transition-all duration-300 hover:border-[#0619dd]/50 md:p-5'} onClick={() => setTipo("carroMoto")}>
                        <div className='flex gap-1'>
                            <span className="material-symbols-outlined text-2xl md:text-3xl">
                                directions_car
                            </span>
                            <span className="material-symbols-outlined text-2xl md:text-3xl">
                                two_wheeler
                            </span>
                        </div>
                        <input type='radio' name="drone" value={'carroMoto'} className='hidden' readOnly id="carroMoto" checked={tipo === 'carroMoto'} />
                        <label htmlFor='carroMoto' className={tipo === 'carroMoto' ? 'text-xs font-semibold uppercase tracking-[0.08em] text-black min-[430px]:text-sm md:text-base' : 'text-xs font-semibold uppercase tracking-[0.08em] text-[#475569] min-[430px]:text-sm md:text-base'}>Ambos</label>
                    </div>
                    <div key={'moto'} className={tipo === 'moto' ? 'flex min-h-[92px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-black bg-[#ffcb00] p-4 text-center text-black transition-all duration-300 md:p-5' : 'flex min-h-[92px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-[#0f172a]/20 bg-white p-4 text-center text-[#475569] transition-all duration-300 hover:border-[#0619dd]/50 md:p-5'} onClick={() => setTipo("moto")}>
                        <span className="material-symbols-outlined text-2xl md:text-3xl">
                            two_wheeler
                        </span>
                        <input readOnly type='radio' name="drone" value={'moto'} id="moto" checked={tipo === 'moto'} className='hidden' />
                        <label htmlFor='moto' className={tipo === 'moto' ? 'text-xs font-semibold uppercase tracking-[0.08em] text-black min-[430px]:text-sm md:text-base' : 'text-xs font-semibold uppercase tracking-[0.08em] text-[#475569] min-[430px]:text-sm md:text-base'}>Moto</label>
                    </div>
                    <div key={'carro'} className={tipo === 'carro' ? 'flex min-h-[92px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-black bg-[#ffcb00] p-4 text-center text-black transition-all duration-300 md:p-5' : 'flex min-h-[92px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-[#0f172a]/20 bg-white p-4 text-center text-[#475569] transition-all duration-300 hover:border-[#0619dd]/50 md:p-5'} onClick={() => setTipo("carro")}>
                        <span className="material-symbols-outlined text-2xl md:text-3xl">
                            directions_car
                        </span>
                        <input readOnly type='radio' name="drone" value={'carro'} className='hidden' id="carro" checked={tipo === 'carro'} />
                        <label htmlFor='carro' className={tipo === 'carro' ? 'text-xs font-semibold uppercase tracking-[0.08em] text-black min-[430px]:text-sm md:text-base' : 'text-xs font-semibold uppercase tracking-[0.08em] text-[#475569] min-[430px]:text-sm md:text-base'}>Carro</label>
                    </div>
                </div>
                <RenderInputs />
                <div className='mt-4 flex flex-col gap-3 md:mt-6'>
                    <label htmlFor='numeroParcelas' className='text-base font-bold uppercase tracking-[0.08em] text-[#0c1327] md:text-lg'>Parcelas: <span className='font-bold text-[#0619dd]'>{numeroParcelas}x</span></label>
                    <input type="range" name="numeroParcelas" value={numeroParcelas} min={1} max={numeroParcelasMaximo} onChange={(e) => setNumeroParcelas(Number(e.target.value))} className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#0619dd]' style={{ accentColor: '#0619dd' }} />
                    <p className='text-xs font-medium text-slate-700 md:text-sm'>AtÃ© {numeroParcelasSemJuros}x <span className='font-bold text-[#0619dd]'>SEM JUROS</span></p>
                </div>
                {testDescontoAula && <DivDescontoAula />}
                {temDescontoAluguel && <DivDescontoVeiculo />}
                <MilestoneInfo />
            </div>
            <div className='border-t border-[#0f172a]/12 pt-4'>
                <Part2 />
            </div>
        </div>

    )
}
