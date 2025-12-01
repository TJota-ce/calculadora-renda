import React from 'react';
import { BookOpen, TrendingUp, DollarSign, Clock, Calculator } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Entenda a Simulação
        </h2>
        <p className="text-slate-600 mt-2">
          Nossa calculadora utiliza o poder dos juros compostos para projetar a longevidade do seu patrimônio.
          Veja como preencher corretamente para obter o melhor resultado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Passo a Passo</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <strong className="block text-slate-800">Capital Inicial</strong>
                <p className="text-sm text-slate-600">O valor total que você tem disponível hoje para investir.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <strong className="block text-slate-800">Retirada Mensal</strong>
                <p className="text-sm text-slate-600">Quanto você precisa sacar todo mês para cobrir seus custos.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <strong className="block text-slate-800">Taxa de Juros</strong>
                <p className="text-sm text-slate-600">A rentabilidade esperada do seu investimento (mensal ou anual).</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <strong className="block text-slate-800">Período</strong>
                <p className="text-sm text-slate-600">Por quanto tempo você deseja manter esse fluxo de retiradas.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            A Matemática
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Utilizamos o conceito de capitalização composta com retiradas periódicas. A cada mês, seu dinheiro rende juros, aumentando o saldo, e em seguida ocorre a retirada, diminuindo o saldo.
          </p>
          
          <div className="bg-white p-4 rounded border border-slate-200 shadow-sm mb-4">
            <p className="text-center font-mono text-blue-900 font-medium">
              Saldo<sub>t</sub> = (Saldo<sub>t-1</sub> × (1 + i)) - R
            </p>
            <div className="mt-2 text-xs text-slate-500 grid grid-cols-2 gap-2">
                <span><strong>Saldo</strong>: Valor no mês atual</span>
                <span><strong>i</strong>: Taxa de juros mensal</span>
                <span><strong>R</strong>: Valor da retirada</span>
            </div>
          </div>

          <h4 className="font-semibold text-slate-800 mt-6 mb-2">Aplicações Práticas</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div className="bg-white p-2 rounded border border-slate-200 flex flex-col items-center text-center">
              <TrendingUp className="w-5 h-5 text-green-500 mb-1" />
              <span>Aposentadoria</span>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 flex flex-col items-center text-center">
              <DollarSign className="w-5 h-5 text-yellow-500 mb-1" />
              <span>Renda Passiva</span>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 flex flex-col items-center text-center">
              <Clock className="w-5 h-5 text-purple-500 mb-1" />
              <span>Planejamento</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;