import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QRCodePix({ chavePix, valor, descricao = "Doação RoadNat" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && chavePix) {
      // Gerar payload PIX
      const pixPayload = gerarPayloadPix(chavePix, valor, descricao);
      
      // Gerar QR Code
      QRCode.toCanvas(canvasRef.current, pixPayload, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, (error) => {
        if (error) console.error('Erro ao gerar QR Code:', error);
      });
    }
  }, [chavePix, valor, descricao]);

  // Função para gerar payload PIX (formato simplificado)
  const gerarPayloadPix = (chave, valor, descricao) => {
    // Este é um formato simplificado. Para produção, use uma biblioteca específica para PIX
    const payload = `00020126${chave.length.toString().padStart(2, '0')}${chave}`;
    return payload;
  };

  return (
    <div className="flex flex-col items-center">
      <canvas 
        ref={canvasRef}
        className="border border-gray-200 rounded-lg"
      />
      <p className="text-xs text-gray-500 mt-2 text-center">
        QR Code PIX para doação
      </p>
    </div>
  );
} 