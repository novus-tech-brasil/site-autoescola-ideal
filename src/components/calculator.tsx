import React, { useState, useEffect, type JSX } from 'react'

type tipos = 'carroMoto' | 'moto' | 'carro'
const valorOriginalAula = 150
const custoAluguelPorVeiculo = 49.99;
const numeroParcelasMaximo = 18;
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
        // const TAXA_BASE = 0.0351;        // 3,51%
        // const JUROS_MENSAL = 0.018;      // 1,8%

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
            <div className='flex flex-col gap-2 mt-3'>
                {
                    tiposInput.map((t) => (
                        <div className='flex flex-col gap-2 mt-4' key={t}>
                            <div className='flex gap-2 items-center justify-between bg-gray-50 p-3 md:p-4 px-4 rounded-lg border border-gray-200'>
                                <h1 className='text-sm md:text-base text-gray-900 font-medium'>Aulas de {t === 'carro' ? 'Carro' : 'Moto'}: <span className='font-bold text-[#071CF8]'>{t == 'carro' ? numAulasCarro : numAulasMoto}</span></h1>

                                <div className='flex gap-2'>
                                    <button className='border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-[#071CF8] p-2 rounded-lg w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer transition-all duration-200 font-semibold' onClick={() => alterarAulas(t, t == 'carro' ? numAulasCarro - 1 : numAulasMoto - 1)}>−</button>
                                    <button className='border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-[#071CF8] p-2 rounded-lg w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer transition-all duration-200 font-semibold' onClick={() => alterarAulas(t, t == 'carro' ? numAulasCarro + 1 : numAulasMoto + 1)}>+</button>
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
            <div className="relative flex mt-4 md:mt-5 overflow-hidden rounded-lg border border-[#FFCB00]/30 bg-[#FFCB00]/5 p-4 md:p-5 shadow-sm min-h-20 justify-start items-center">
                <div className="relative z-10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#FFCB00] text-5xl flex-shrink-0">
                        local_offer
                    </span>
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-700">
                            Desconto Aplicado nas aulas
                        </span>
                        <span className="text-lg md:text-xl text-gray-900 font-bold mt-1">
                            {descontoAula.toFixed(0)}% de desconto
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const DivDescontoVeiculo = () => {
        return (
            <div className="relative mt-4 md:mt-5 flex overflow-hidden rounded-lg border border-[#071CF8]/30 bg-[#071CF8]/5 p-4 md:p-5 shadow-sm min-h-20 justify-start items-center">
                <div className="relative z-10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#071CF8] text-5xl flex-shrink-0">
                        directions_car
                    </span>
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-700">
                            Desconto Aplicado no aluguel do(s) veículo(s)
                        </span>
                        <span className="text-lg md:text-xl text-gray-900 font-bold mt-1">
                            {descontoAluguel.toFixed(0)}% de desconto
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const Detalhes = () => {
        return (
            <div className='bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200 w-full h-full'>
                <h2 className='text-base md:text-lg font-bold mb-4 text-gray-900'>O que está incluído:</h2>
                <ul className='flex flex-col list-disc list-inside text-sm md:text-base text-gray-700 space-y-2'>
                    {tipo.toLocaleLowerCase().includes("carro") && <li>{numAulasCarro} x Aulas de Carro</li>}
                    {tipo.toLocaleLowerCase().includes("moto") && <li>{numAulasMoto} x Aulas de Moto</li>}
                    <li>Veículo incluso no exame prático</li>
                    <li>Agendamento feito por nós</li>
                    {aulasTotaisSoma >= 6 && <li>Base Teórica para Aprendizado Eficiente</li>}
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
        const mensagem = `Olá, gostaria de iniciar meu processo para tirar a CNH com o seguinte plano:%0A%0A` +
            `Tipo: ${tipo === 'carroMoto' ? 'Carro e Moto' : tipo === 'carro' ? 'Apenas Carro' : 'Apenas Moto'}%0A` +
            `Número de aulas de ${tipo === 'carroMoto' ? `carro: ${numAulasCarro}%0ANúmero de aulas de moto: ${numAulasMoto}%0A` : (tipo === 'carro' ? `carro: ${numAulasCarro}%0A` : `moto: ${numAulasMoto}%0A`)}` +
            `Número de parcelas: ${numeroParcelas}%0A` +
            `Valor Aproximado ${formatter.format(valorTotal)}%0A` +
            `${numeroParcelas > numeroParcelasSemJuros ? 'Com juros da maquininha inclusos!%0A%0A' : 'SEM JUROS%0A%0A'}` +
            `Por favor, me envie mais informações sobre como proceder. Obrigado!`;
        window.open(`https://wa.me/5567981368080?text=${mensagem}`, '_blank');
    }

    const Buttons = () => {
        return (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-6'>
                <button className='border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all duration-300 py-3 md:py-4 px-4 text-gray-800 text-sm md:text-base font-semibold w-full rounded-lg cursor-pointer hover:border-gray-400' onClick={() => reset()}>
                    Reiniciar
                </button>
                <button className='bg-[#071CF8] border border-[#071CF8] hover:bg-[#041092] transition-all duration-300 py-3 md:py-4 px-4 text-white font-semibold w-full rounded-lg cursor-pointer md:col-span-2 flex flex-col items-center justify-center gap-1' onClick={() => enviarMensagem()}>
                    <span>Quero Iniciar Agora!</span>
                    <p className='text-xs text-white/80'>Leva menos de 2 minutos</p>
                </button>
            </div>
        )
    }

    const Part2 = () => (
        <div className='flex flex-col gap-3'>
            <h1 className='text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900'>{formatter.format(valorTotal)}</h1>
            {numeroParcelas > 1 ? <p className='text-sm md:text-base text-gray-600 leading-relaxed'>ou <span className='font-bold text-[#071CF8]'>{numeroParcelas}x</span> de <span className='font-bold text-[#071CF8]'>{formatter.format(valorTotal / numeroParcelas)}</span> <span className={valorTotal == valorTotalSemJuros ? 'font-bold text-green-600' : 'text-gray-600'}>{valorTotal == valorTotalSemJuros ? '✓ SEM JUROS' : 'com juros'}</span></p> : <p className='text-sm md:text-base text-gray-600 font-medium'>Pagamento à vista</p>}
            <details className='mt-6 md:mt-8 group'>
                <summary className='cursor-pointer text-sm md:text-base text-gray-900 font-semibold flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all'>
                    <div className='flex gap-3 items-center'>
                        <span className="material-symbols-outlined group-open:rotate-90 transition-transform">
                            chevron_right
                        </span>
                        Como é calculado o valor?
                    </div>
                </summary>
                <div className='border-l-4 border-[#071CF8] p-4 md:p-5 bg-gray-50'>
                    <h3 className='text-xs md:text-sm font-bold text-gray-700 mb-1'>Valor por aula:</h3>
                    <h1 className='text-2xl md:text-3xl font-bold text-[#071CF8] mb-4'>{formatter.format(valorPorAula)}</h1>
                    <h3 className='text-xs md:text-sm font-bold text-gray-700 mb-1'>Aluguel do(s) veículo(s):</h3>
                    <h1 className='text-2xl md:text-3xl font-bold text-[#071CF8]'>{valorAluguel > 0 ? formatter.format(valorAluguel) : '✓ Grátis!'}
                        <p className='text-xs text-gray-500'>* O aluguel é incluso no valor do plano!</p>
                        <p className="text-xs text-gray-500">
                            * O valor do aluguel incluído neste pacote é válido apenas para o primeiro exame de cada categoria. Em caso de reprovação, será necessário efetuar um novo pagamento do aluguel.
                        </p>
                    </h1>
                </div>
            </details>
            <details className='mt-4 md:mt-6 group'>
                <summary className='cursor-pointer text-sm md:text-base text-gray-900 font-semibold flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all'>
                    <div className='flex gap-3 items-center'>
                        <span className="material-symbols-outlined group-open:rotate-90 transition-transform">
                            chevron_right
                        </span>
                        O que está incluso?
                    </div>
                </summary>
                <div className='border-l-4 border-[#071CF8] p-4 md:p-5 bg-gray-50'>
                    <Detalhes />
                    <p className='text-xs md:text-sm text-gray-500 mt-4'>* Os valores não incluem taxas e exames adicionais do Detran.</p>
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


    return (
        <div className='w-full bg-white p-5 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6 transition-all duration-300'>
            <div className='flex flex-col relative'>
                <p className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>{`Escolha seu Plano`}</p>
                <div className='grid grid-cols-3 gap-3 md:flex md:flex-row md:gap-3'>
                    <div key={'carroMoto'} className={tipo === 'carroMoto' ? 'bg-[#071CF8] p-4 md:p-5 rounded-lg justify-center items-center flex flex-col gap-2 w-full text-white cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md' : 'bg-gray-50 p-4 md:p-5 rounded-lg justify-center items-center border-2 border-gray-200 flex flex-col gap-2 w-full text-gray-700 cursor-pointer hover:border-gray-300 hover:bg-gray-100 transition-all duration-300'} onClick={() => setTipo("carroMoto")}>
                        <div className='flex gap-1'>
                            <span className="material-symbols-outlined text-2xl md:text-3xl">
                                directions_car
                            </span>
                            <span className="material-symbols-outlined text-2xl md:text-3xl">
                                two_wheeler
                            </span>
                        </div>
                        <input type='radio' name="drone" value={'carroMoto'} className='hidden' readOnly id="carroMoto" checked={tipo === 'carroMoto'} />
                        <label htmlFor='carroMoto' className={tipo === 'carroMoto' ? 'text-sm md:text-base font-semibold text-white' : 'text-sm md:text-base font-semibold text-gray-700'}>Ambos</label>
                    </div>
                    <div key={'moto'} className={tipo === 'moto' ? 'bg-[#071CF8] p-4 md:p-5 rounded-lg justify-center items-center flex flex-col gap-2 w-full text-white cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md' : 'bg-gray-50 p-4 md:p-5 rounded-lg justify-center items-center border-2 border-gray-200 flex flex-col gap-2 w-full text-gray-700 cursor-pointer hover:border-gray-300 hover:bg-gray-100 transition-all duration-300'} onClick={() => setTipo("moto")}>
                        <span className="material-symbols-outlined text-2xl md:text-3xl">
                            two_wheeler
                        </span>
                        <input readOnly type='radio' name="drone" value={'moto'} id="moto" checked={tipo === 'moto'} className='hidden' />
                        <label htmlFor='moto' className={tipo === 'moto' ? 'text-sm md:text-base font-semibold text-white' : 'text-sm md:text-base font-semibold text-gray-700'}>Moto</label>
                    </div>
                    <div key={'carro'} className={tipo === 'carro' ? 'bg-[#071CF8] p-4 md:p-5 rounded-lg justify-center items-center flex flex-col gap-2 w-full text-white cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md' : 'bg-gray-50 p-4 md:p-5 rounded-lg justify-center items-center border-2 border-gray-200 flex flex-col gap-2 w-full text-gray-700 cursor-pointer hover:border-gray-300 hover:bg-gray-100 transition-all duration-300'} onClick={() => setTipo("carro")}>
                        <span className="material-symbols-outlined text-2xl md:text-3xl">
                            directions_car
                        </span>
                        <input readOnly type='radio' name="drone" value={'carro'} className='hidden' id="carro" checked={tipo === 'carro'} />
                        <label htmlFor='carro' className={tipo === 'carro' ? 'text-sm md:text-base font-semibold text-white' : 'text-sm md:text-base font-semibold text-gray-700'}>Carro</label>
                    </div>
                </div>
                <RenderInputs />
                <div className='mt-4 md:mt-6 gap-3 flex flex-col'>
                    <label htmlFor='numeroParcelas' className='text-base md:text-lg font-bold text-gray-900'>Parcelas: <span className='text-[#071CF8] font-bold'>{numeroParcelas}x</span></label>
                    <input type="range" name="numeroParcelas" value={numeroParcelas} min={1} max={numeroParcelasMaximo} onChange={(e) => setNumeroParcelas(Number(e.target.value))} className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#071CF8]' style={{ accentColor: '#071CF8' }} />
                    <p className='text-xs md:text-sm font-medium text-gray-500'>Até {numeroParcelasSemJuros}x <span className='text-[#071CF8] font-bold'>SEM JUROS</span></p>
                </div>
                {testDescontoAula && <DivDescontoAula />}
                {temDescontoAluguel && <DivDescontoVeiculo />}
            </div>
            <div className='border-t border-gray-200 pt-4'>
                <Part2 />
            </div>
        </div>

    )
}
