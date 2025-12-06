import React, { useState } from 'react';
import { Calculator, RotateCcw, BarChart3, ChevronRight } from 'lucide-react';
import { SimulationInput, SimulationSummary } from './types';
import { calculateSimulation } from './services/calculator';
import ResultsDisplay from './components/ResultsDisplay';
import InfoSection from './components/InfoSection';

const App: React.FC = () => {
  const [input, setInput] = useState<SimulationInput>({
    initialValue: 1000000,
    monthlyWithdrawal: 8000,
    interestRate: 10,
    rateType: 'annual',
    period: 10,
    periodType: 'years',
  });

  const [result, setResult] = useState<SimulationSummary | null>(null);

  const handleInputChange = (field: keyof SimulationInput, value: string | number) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Helper to format value for display
  const formatCurrencyValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Helper to handle currency input changes (ATM style)
  const handleCurrencyChange = (field: keyof SimulationInput, value: string) => {
    const digits = value.replace(/\D/g, '');
    const numberValue = Number(digits) / 100;
    
    setInput((prev) => ({
      ...prev,
      [field]: numberValue,
    }));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = calculateSimulation(input);
    setResult(summary);
    
    // Scroll to results on mobile
    setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const handleClear = () => {
    setInput({
      initialValue: 0,
      monthlyWithdrawal: 0,
      interestRate: 0,
      rateType: 'annual',
      period: 0,
      periodType: 'years',
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">iJota</h1>
              <p className="text-xs text-blue-300 uppercase tracking-widest font-semibold">Financeira</p>
            </div>
          </div>
          <nav className="hidden md:block">
            <span className="text-sm font-medium text-blue-200">Simulador de Renda</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* Input Section - Full Width */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
              <Calculator className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800">
                Calculadora de Renda
              </h2>
            </div>
            
            <form onSubmit={handleCalculate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Initial Value */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Valor inicial
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600 sm:text-sm font-medium">
                      R$
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatCurrencyValue(input.initialValue)}
                      onChange={(e) => handleCurrencyChange('initialValue', e.target.value)}
                      className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-md border border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                {/* Monthly Withdrawal */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Valor de retirada mensal
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600 sm:text-sm font-medium">
                      R$
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatCurrencyValue(input.monthlyWithdrawal)}
                      onChange={(e) => handleCurrencyChange('monthlyWithdrawal', e.target.value)}
                      className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-md border border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Taxa de juros
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600 sm:text-sm font-medium">
                      %
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={input.interestRate}
                      onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                      className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none border border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none"
                      placeholder="Ex: 10"
                    />
                     <div className="relative">
                        <select
                          value={input.rateType}
                          onChange={(e) => handleInputChange('rateType', e.target.value)}
                          className="h-full rounded-r-md border border-l-0 border-slate-300 bg-white py-0 pl-3 pr-8 text-slate-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none"
                        >
                          <option value="annual">anual</option>
                          <option value="monthly">mensal</option>
                        </select>
                     </div>
                  </div>
                </div>

                {/* Period */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tempo de retirada
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      type="number"
                      min="1"
                      value={input.period}
                      onChange={(e) => handleInputChange('period', parseFloat(e.target.value) || 0)}
                      className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-l-md border border-r-0 border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none"
                      placeholder="Ex: 10"
                    />
                     <div className="relative">
                        <select
                          value={input.periodType}
                          onChange={(e) => handleInputChange('periodType', e.target.value)}
                          className="h-full rounded-r-md border border-slate-300 bg-white py-0 pl-3 pr-8 text-slate-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none"
                        >
                          <option value="years">ano(s)</option>
                          <option value="months">mês(es)</option>
                        </select>
                     </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col md:flex-row gap-4 justify-between border-t border-slate-50 mt-4">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Calcular Resultado
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Limpar
                  </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-8" id="results-section">
            {result ? (
              <ResultsDisplay summary={result} />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 className="w-10 h-10 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Pronto para simular?</h3>
                <p className="text-slate-500 max-w-md">
                  Preencha os dados acima e clique em "Calcular Resultado" para ver sua projeção financeira detalhada.
                </p>
              </div>
            )}
            
            <InfoSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 font-medium text-white">iJota Financeira</p>
          <p className="text-sm">
            &copy; 2025 IJota Financeira. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-4 max-w-2xl mx-auto text-slate-600">
            Atenção: Este simulador é apenas uma ferramenta educativa. Os resultados são estimativas baseadas nos dados fornecidos e não garantem rentabilidade futura. Consulte um especialista financeiro antes de tomar decisões de investimento.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;