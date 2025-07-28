import { AdZone } from '@/components/ads/AdZone';

export default function TestAdsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Тест рекламных блоков РСЯ</h1>
        
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Header Banner (R-A-16407258-1)</h2>
            <AdZone zoneId="header-banner" />
          </div>

          {/* Sidebar Top */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sidebar Top (R-A-16407258-2)</h2>
            <AdZone zoneId="sidebar-top" />
          </div>

          {/* Sidebar Bottom */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sidebar Bottom (R-A-16407258-3)</h2>
            <AdZone zoneId="sidebar-bottom" />
          </div>

          {/* Footer Banner */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Footer Banner (R-A-16407258-4)</h2>
            <AdZone zoneId="footer-banner" />
          </div>

          {/* Дополнительные тесты */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Top Banner (R-A-16407258-1)</h2>
            <AdZone zoneId="top-banner" />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Bottom Banner (R-A-16407258-4)</h2>
            <AdZone zoneId="bottom-banner" />
          </div>
        </div>

        {/* Информация о настройках */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Информация о настройках</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Счетчик Яндекс.Метрики:</strong> 103475212</p>
            <p><strong>Домен:</strong> aibotsnews.ru</p>
            <p><strong>Рекламные блоки РСЯ:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>header-banner: R-A-16407258-1</li>
              <li>sidebar-top: R-A-16407258-2</li>
              <li>sidebar-bottom: R-A-16407258-3</li>
              <li>footer-banner: R-A-16407258-4</li>
            </ul>
            <p><strong>Статус:</strong> Все блоки активны в кабинете РСЯ</p>
          </div>
        </div>

        {/* Инструкции по проверке */}
        <div className="mt-6 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-4">Как проверить работу рекламы</h3>
          <div className="space-y-2 text-sm text-yellow-800">
            <p>1. Откройте консоль браузера (F12)</p>
            <p>2. Проверьте, загружается ли скрипт РСЯ</p>
            <p>3. Проверьте, нет ли ошибок в консоли</p>
            <p>4. Убедитесь, что домен соответствует настройкам в РСЯ</p>
            <p>5. Проверьте, что блоки не заблокированы AdBlock</p>
          </div>
        </div>
      </div>
    </div>
  );
} 