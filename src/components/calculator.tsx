import React, { useState, useEffect, type JSX } from 'react'

type tipos = 'carroMoto' | 'moto' | 'carro'
const valorOriginalAula = 100
const custoAluguelCarro = 49.99;

const taxas: any = {
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
    const [valorAula, setValorAula] = useState<number>(100)
    const [numeroParcelas, setNumeroParcelas] = useState<number>(6)
    const [aulasTotaisSoma, setAulasTotaisSoma] = useState<number>(4)

    useEffect(() => {
        setNumAulasMoto(2)
        setNumAulasCarro(2)
    }, [tipo])

    useEffect(() => {
        calcularValorComDesconto()
    }, [numAulasMoto, numAulasCarro, tipo])

    useEffect(() => {
        if (numeroParcelas > 6) {
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

        const tipos: tipos[] = [];
        if (tipo === 'carro') tipos.push('carro');
        if (tipo === 'moto') tipos.push('moto');
        if (tipo == 'carroMoto') {
            tipos.push('carro');
            tipos.push('moto');
        }

        return (
            <div className=' flex flex-col gap-3 mt-4'>
                {
                    tipos.map((t) => (
                        <div className='flex flex-col'>
                            <legend className='mb-2 text-sm text-blue-200'>
                                {`> Número de aulas de ${t}`}
                            </legend>

                            <div className='flex gap-2 items-center'>
                                <button
                                    className='input-button'
                                    onClick={() => alterarAulas(t, t === 'carro' ? numAulasCarro - 1 : numAulasMoto - 1)}
                                >
                                    -
                                </button>

                                <h1>{t === 'carro' ? numAulasCarro : numAulasMoto}</h1>

                                <button
                                    className='input-button'
                                    onClick={() => alterarAulas(t, t === 'carro' ? numAulasCarro + 1 : numAulasMoto + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    };


    const aplicarDesconto = (valor: number, desconto: number) => {
        return valor - (valor * (desconto / 100))
    }

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
        if (aulasTotais >= 10 && aulasTotais < 15) {
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
            valorAulaLocal = 100;
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
            return custoAluguelCarro
        }
        return custoAluguelCarro * 2 + 0.01
    }


    const testDescontoAula = valorOriginalAula - valorAula > 0 ? true : false;
    const testDescontoAluguel = calcularCustoAluguel() - valorAluguel;
    const descontoAluguel = testDescontoAluguel * 100 / calcularCustoAluguel();
    const descontoAula = (valorOriginalAula - valorAula) * 100 / valorOriginalAula;


    const DivDescontoAula = () => {
        return (
            <div className="relative flex mt-6 overflow-hidden rounded-2xl border border-amber-400 bg-amber-200 p-5 shadow-lg min-h-30 justify-start items-center">
                {/* brilho decorativo */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/30 blur-2xl" />

                <div className="relative z-10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-amber-700 text-5xl">
                        local_offer
                    </span>

                    <div className="flex flex-col">
                        <span className="text-sm uppercase tracking-wide text-amber-800/70">
                            Desconto aplicado
                        </span>

                        <span className="text-lg text-amber-900 font-light">
                            Você recebeu
                            <strong className="ml-1 font-semibold">
                                {descontoAula.toFixed(0)}%
                            </strong>
                            {' '}nas aulas
                        </span>
                    </div>
                </div>
            </div>

        )
    }

    const DivDescontoVeiculo = () => {
        return (
            <div className="relative mt-6 flex overflow-hidden rounded-2xl border border-green-500 bg-green-400 p-5 shadow-lg lg min-h-30 justify-start items-center">
                {/* brilho decorativo */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

                <div className="relative z-10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-green-900 text-5xl">
                        directions_car
                    </span>

                    <div className="flex flex-col">
                        <span className="text-sm uppercase tracking-wide text-green-900/70">
                            Desconto no aluguel
                        </span>

                        <span className="text-lg text-green-950 font-light">
                            Você recebeu
                            <strong className="ml-1 font-semibold">
                                {descontoAluguel.toFixed(0)}%
                            </strong>
                            {' '}no aluguel dos veículos
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const Detalhes = () => {
        return (
            <div className='bg-blue-600/40 p-5 rounded-3xl border-2 border-blue-300 w-full h-full mt-4'>
                <h2 className='text-lg font-medium mb-2 text-blue-200 uppercase'>Incluido no pacote:</h2>
                <ul className='flex flex-col list-disc list-inside'>
                    {tipo.toLocaleLowerCase().includes("carro") && <li>{numAulasCarro} x Aulas de Carro</li>}
                    {tipo.toLocaleLowerCase().includes("moto") && <li>{numAulasMoto} x Aulas de Moto</li>}
                    <li>Veículo incluso no exame prático</li>
                    <li>Agendamento feito por nós</li>
                    {aulasTotaisSoma >= 6 && <li>Curso teórico de 6 horas (OPCIONAL)</li>}
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
        setValorAula(100)
        setTipo('carroMoto')
        setNumeroParcelas(6)
    }

    const enviarMensagem = () => {
        const mensagem = `Olá, gostaria de iniciar meu processo para tirar a CNH com o seguinte plano:%0A%0A` +
            `Tipo: ${tipo === 'carroMoto' ? 'Carro e Moto' : tipo === 'carro' ? 'Apenas Carro' : 'Apenas Moto'}%0A` +
            `Número de aulas de ${tipo === 'carroMoto' ? `carro: ${numAulasCarro}%0ANúmero de aulas de moto: ${numAulasMoto}%0A` : (tipo === 'carro' ? `carro: ${numAulasCarro}%0A` : `moto: ${numAulasMoto}%0A`)}` +
            `Número de parcelas: ${numeroParcelas}%0A` +
            `Valor Aproximado ${formatter.format(valorTotal)}%0A` +
            `${numeroParcelas > 6 ? 'Com juros da maquininha inclusos!%0A%0A' : 'SEM JUROS%0A%0A'}` +
            `Por favor, me envie mais informações sobre como proceder. Obrigado!`;
        window.open(`https://wa.me/5517997572900?text=${mensagem}`, '_blank');
    }

    const Buttons = () => {
        return (
            <div className='grid-cols-1 lg:grid-cols-5 gap-2 mt-5 grid'>
                <button className='border bg-neutral-100/30 col-span-2 hover:bg-neutral-400/40 transition-all duration-300 py-3 px-6 text-white w-full rounded-full cursor-pointer hover:opacity-90' onClick={() => reset()}>
                    Reiniciar
                </button>
                <button className='bg-green-400/80 border col-span-3 border-green-200 hover:bg-green-600/40 transition-all duration-300 py-3 px-6 text-green-900 w-full rounded-full cursor-pointer hover:opacity-90' onClick={() => enviarMensagem()}>
                    Quero iniciar agora!
                    <p className='text-[10px] text-green-900'>Leva menos de 2 minutos!</p>
                </button>
            </div>
        )
    }

    const cssSelecionado = 'bg-secondary/40 p-5 rounded-3xl justify-center items-center border-2 border-amber-300 flex flex-col gap-1 w-full text-amber-300 cursor-pointer hover:border-amber-400 hover:bg-secondary/60 transition-all duration-300';
    const cssPadrao = 'bg-blue-600/40 p-5 rounded-3xl justify-center items-center border-2 border-blue-300 flex flex-col gap-1 w-full text-blue-200 cursor-pointer hover:border-blue-400 hover:bg-blue-600/60 transition-all duration-300';


    return (
        <div className='w-full bg-linear-65 p-8 from-blue-600 to-blue-700 border-2 border-blue-700 text-white rounded-3xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 '>
            <div className='flex flex-col relative'>
                <div className='opacity-40 flex gap-2 items-center justify-start'>
                    <div className='bg-blue-200 rounded-full h-3 w-3'></div>
                    <div className='bg-blue-200 rounded-full h-3 w-3'></div>
                    <div className='bg-blue-200 rounded-full h-3 w-3'></div>
                </div>
                <h3 className='text-md uppercase opacity-60 font-extralight mt-6'>Descubra qual o pacote</h3>
                <h1 className='text-5xl font-semibold'><strong className='text-amber-400 uppercase'>Perfeito</strong> para você</h1>
                <h2 className='text-lg font-light mt-2 text-blue-200'>Configure a melhor forma de tirar a sua CNH!</h2>

                <fieldset className='mt-8 flex flex-col lg:flex-row gap-3'>
                    <legend className='mb-4 text-xl text-blue-200'>{`>> Escolha o plano:`}</legend>
                    <div className={tipo === 'carroMoto' ? cssSelecionado : cssPadrao} onClick={() => setTipo("carroMoto")}>
                        <div className='flex gap-2'>
                            <span className="material-symbols-outlined !text-4xl">
                                directions_car
                            </span>
                            <span className="material-symbols-outlined !text-4xl">
                                two_wheeler
                            </span>
                        </div>

                        <input
                            type='radio'
                            name="drone"
                            value={'carroMoto'}
                            className='hidden'
                            id="carroMoto"
                            checked={tipo === 'carroMoto'}
                        />
                        <label htmlFor='carroMoto' className='text-lg font-light'>Carro e moto</label>
                    </div>
                    <div className={tipo === 'moto' ? cssSelecionado : cssPadrao} onClick={() => setTipo("moto")}>
                        <span className="material-symbols-outlined !text-4xl">
                            two_wheeler
                        </span>
                        <input
                            type='radio'
                            name="drone"
                            value={'moto'}
                            id="moto"
                            checked={tipo === 'moto'}
                            className='hidden'
                        />
                        <label htmlFor='moto' className='text-lg'>Moto</label>
                    </div>
                    <div className={tipo === 'carro' ? cssSelecionado : cssPadrao} onClick={() => setTipo("carro")}>
                        <span className="material-symbols-outlined !text-4xl">
                            directions_car
                        </span>
                        <input
                            type='radio'
                            name="drone"
                            value={'carro'}
                            className='hidden'
                            id="carro"
                            checked={tipo === 'carro'}
                        />
                        <label htmlFor='carro' className='text-lg'>Carro</label>
                    </div>
                </fieldset>
                <RenderInputs />
                <div className='mt-3 gap-4 flex flex-col'>
                    <label htmlFor='numeroParcelas' className='mt-6 text-lg font-medium'>Número de parcelas: {numeroParcelas}</label>
                    <input type="range" name="numeroParcelas" value={numeroParcelas} min={1} max={18} onChange={(e) => setNumeroParcelas(Number(e.target.value))} />
                    <p className='text-sm font-light mt-2 text-blue-200'>Parcelamento em até 6x é SEM JUROS</p>
                </div>
                {testDescontoAula && <DivDescontoAula />}
                {(testDescontoAluguel > 0) && <DivDescontoVeiculo />}
            </div>
            <div className='flex flex-col ga-1'>
                <h3 className='text-xl'>Valor total aproximado:</h3>
                <h1 className='text-4xl lg:text-6xl font-semibold'>{formatter.format(valorTotal)}</h1>
                {numeroParcelas > 1 ? <p className='mt-3 opacity-00 font-light'>ou em <strong className='uppercase font-semibold text-2xl'>{numeroParcelas}x</strong> de <strong className='uppercase font-semibold text-2xl'>{formatter.format(valorTotal / numeroParcelas)}</strong> {valorTotal == valorTotalSemJuros ? 'SEM JUROS' : 'com juros da maquininha'}</p> : <p>A vista    </p>}
                <h3 className='text-md lg:text-lg mt-4 lg:mt-6 text-blue-200'>Valor por aula aproximado:</h3>
                <h1 className='text-2xl lg:text-4xl font-semibold text-blue-200'>{formatter.format(valorPorAula)}</h1>
                <Detalhes />
                <p className='mt-4'>* Os valores apresentados não incluem taxas e exames adicionais.</p>
                <Buttons />
            </div>
        </div>
    )
}
