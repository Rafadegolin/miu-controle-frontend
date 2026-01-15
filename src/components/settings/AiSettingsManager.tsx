import { useState, useEffect } from "react";
import { aiSettingsActions } from "@/services/ai-settings.actions";
import { AiConfig, AiModel, AiProvider } from "@/types/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Assuming Switch exists, if not I'll use a checkbox or simple button toggle
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2, AlertCircle, Key, BrainCircuit, Sparkles } from "lucide-react";
import styles from "@/components/dashboard/styles/Dashboard.module.css";

export function AiSettingsManager() {
  const [config, setConfig] = useState<AiConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Key state
  const [openaiKey, setOpenaiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [testingKey, setTestingKey] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await aiSettingsActions.getAiConfig();
      setConfig(data);
    } catch (error) {
      toast.error("Erro ao carregar configurações de IA.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      const updated = await aiSettingsActions.updateAiConfig({
        isAiEnabled: config.isAiEnabled,
        categorizationModel: config.categorizationModel,
        analyticsModel: config.analyticsModel,
        openaiApiKey: openaiKey || undefined,
        geminiApiKey: geminiKey || undefined,
      });
      setConfig(updated);
      setOpenaiKey(""); // Clear input after save for security
      setGeminiKey("");
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar configurações.");
    } finally {
      setSaving(false);
    }
  };

  const testKey = async (provider: AiProvider, key: string) => {
    if (!key) return;
    setTestingKey(provider);
    try {
      const result = await aiSettingsActions.testAiKey(provider, key);
      if (result.valid) {
        toast.success(`Chave ${provider} válida!`);
      } else {
        toast.error(`Chave ${provider} inválida: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao testar chave ${provider}.`);
    } finally {
      setTestingKey(null);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-[#32d6a5]" /></div>;
  }

  if (!config) return null;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <Sparkles className="text-[#32d6a5]" size={20} />
             Inteligência Artificial (Miu AI)
           </h3>
           <p className="text-sm text-gray-400 mt-1">
             Configure os cérebros por trás das recomendações automáticas.
           </p>
        </div>
        <div className="flex items-center gap-3">
            <span className={`text-sm font-bold ${config.isAiEnabled ? "text-[#32d6a5]" : "text-gray-500"}`}>
                {config.isAiEnabled ? "Habilitado" : "Desabilitado"}
            </span>
            <Switch 
                checked={config.isAiEnabled} 
                onCheckedChange={(checked) => setConfig({ ...config, isAiEnabled: checked })}
            />
        </div>
      </div>

      {/* Models Section */}
      <div className={`${styles.glassCard} p-6 space-y-6 opacity-90 hover:opacity-100 transition-opacity`}>
          <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="text-[#32d6a5]" size={20} />
              <h4 className="font-bold text-white">Seleção de Modelos</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label>Categorização de Transações</Label>
                  <p className="text-xs text-gray-500 mb-2">Usado para identificar categorias automaticamente. Recomenda-se modelos mais rápidos e baratos.</p>
                  <Select 
                    value={config.categorizationModel} 
                    onValueChange={(val) => setConfig({ ...config, categorizationModel: val })}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-white/10 text-white cursor-pointer">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#06181b] border border-white/10 text-white">
                      <SelectItem value={AiModel.GPT_4O_MINI} className="focus:bg-white/10 focus:text-white cursor-pointer">GPT-4o Mini (Recomendado)</SelectItem>
                      <SelectItem value={AiModel.GEMINI_1_5_FLASH} className="focus:bg-white/10 focus:text-white cursor-pointer">Gemini 1.5 Flash (Rápido)</SelectItem>
                      <SelectItem value={AiModel.GPT_4O} className="focus:bg-white/10 focus:text-white cursor-pointer">GPT-4o (Preciso/Caro)</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

              <div className="space-y-2">
                  <Label>Análise e Planejamento</Label>
                  <p className="text-xs text-gray-500 mb-2">Usado para insights complexos e planejamento de metas. Recomenda-se modelos mais inteligentes.</p>
                  <Select 
                    value={config.analyticsModel} 
                    onValueChange={(val) => setConfig({ ...config, analyticsModel: val })}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-white/10 text-white cursor-pointer">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#06181b] border border-white/10 text-white">
                      <SelectItem value={AiModel.GPT_4O} className="focus:bg-white/10 focus:text-white cursor-pointer">GPT-4o (Melhor Raciocínio)</SelectItem>
                      <SelectItem value={AiModel.GEMINI_1_5_PRO} className="focus:bg-white/10 focus:text-white cursor-pointer">Gemini 1.5 Pro (Maior Contexto)</SelectItem>
                      <SelectItem value={AiModel.GEMINI_1_5_FLASH} className="focus:bg-white/10 focus:text-white cursor-pointer">Gemini 1.5 Flash (Rápido)</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
          </div>
      </div>

      {/* Keys Section */}
      <div className={`${styles.glassCard} p-6 space-y-6 opacity-90 hover:opacity-100 transition-opacity`}>
          <div className="flex items-center gap-2 mb-4">
              <Key className="text-[#32d6a5]" size={20} />
              <h4 className="font-bold text-white">Chaves de API (Opcional)</h4>
          </div>
          <p className="text-sm text-gray-400 mb-4">
             Se você possui um plano PRO, chaves não são necessárias. Para uso gratuito além do limite, forneça suas próprias chaves.
          </p>

          <div className="space-y-6">
              {/* OpenAI Key */}
              <div className="space-y-2">
                  <div className="flex justify-between">
                     <Label>OpenAI API Key</Label>
                     {config.hasOpenAiKey && <span className="text-xs text-[#32d6a5] flex items-center gap-1"><CheckCircle2 size={12}/> Chave configurada</span>}
                  </div>
                  <div className="flex gap-2">
                      <Input 
                        type="password" 
                        placeholder={config.hasOpenAiKey ? "•••••••••••••••••" : "sk-..."}
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                        className="bg-[#0f172a] border-white/10 text-white flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        onClick={() => testKey(AiProvider.OPENAI, openaiKey)}
                        disabled={!openaiKey || testingKey === AiProvider.OPENAI}
                        className="border border-white/10 hover:bg-white/5"
                      >
                         {testingKey === AiProvider.OPENAI ? <Loader2 className="animate-spin" /> : "Testar"}
                      </Button>
                  </div>
              </div>

              {/* Gemini Key */}
              <div className="space-y-2">
                  <div className="flex justify-between">
                     <Label>Gemini API Key</Label>
                     {config.hasGeminiKey && <span className="text-xs text-[#32d6a5] flex items-center gap-1"><CheckCircle2 size={12}/> Chave configurada</span>}
                  </div>
                  <div className="flex gap-2">
                      <Input 
                        type="password" 
                        placeholder={config.hasGeminiKey ? "•••••••••••••••••" : "AIza..."}
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                         className="bg-[#0f172a] border-white/10 text-white flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        onClick={() => testKey(AiProvider.GEMINI, geminiKey)}
                        disabled={!geminiKey || testingKey === AiProvider.GEMINI}
                        className="border border-white/10 hover:bg-white/5"
                      >
                         {testingKey === AiProvider.GEMINI ? <Loader2 className="animate-spin" /> : "Testar"}
                      </Button>
                  </div>
              </div>
          </div>
      </div>

      {/* Save Action */}
      <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="cursor-pointer bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold px-8 py-6 rounded-xl text-lg shadow-[0_0_20px_rgba(50,214,165,0.3)] hover:shadow-[0_0_30px_rgba(50,214,165,0.5)] transition-all active:scale-95"
          >
             {saving ? <Loader2 className="animate-spin mr-2" /> : "Salvar Configurações"}
          </Button>
      </div>
    </div>
  );
}
