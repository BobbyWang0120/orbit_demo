import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // 初始化地图
      mapRef.current = L.map('map', {
        zoomControl: false,
      }).setView([35.6762, 139.6503], 13);

      // 使用 CartoDB 的地图样式
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 18,
      }).addTo(mapRef.current);

      // 添加自定义缩放控件
      const zoomControl = L.control.zoom({
        position: 'bottomright'
      }).addTo(mapRef.current);

      // 自定义地图控件和标记的样式
      const style = document.createElement('style');
      style.textContent = `
        /* 自定义缩放控件样式 */
        .leaflet-control-zoom {
          border: none !important;
          border-radius: var(--border-radius-md) !important;
          overflow: hidden;
          box-shadow: var(--shadow-md) !important;
        }
        
        .leaflet-control-zoom a {
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          color: var(--text-primary) !important;
          background-color: white !important;
          border: 1px solid var(--border-color) !important;
          font-size: 16px !important;
          transition: all 0.2s ease !important;
        }
        
        .leaflet-control-zoom a:hover {
          background-color: var(--hover-color) !important;
          color: var(--primary-color) !important;
        }
        
        /* 自定义地图标记样式 */
        .custom-div-icon {
          background: none;
          border: none;
        }
        
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          background: var(--primary-color);
          position: absolute;
          transform: rotate(-45deg);
          left: 50%;
          top: 50%;
          margin: -15px 0 0 -15px;
        }

        .marker-pin::after {
          content: '';
          width: 24px;
          height: 24px;
          margin: 3px 0 0 3px;
          background: #fff;
          position: absolute;
          border-radius: 50%;
        }
        
        /* 自定义弹出窗口样式 */
        .leaflet-popup-content-wrapper {
          border-radius: var(--border-radius-lg) !important;
          box-shadow: var(--shadow-lg) !important;
        }
        
        .leaflet-popup-content {
          margin: 12px 16px !important;
          font-family: inherit !important;
        }
        
        .leaflet-popup-tip-container {
          margin-top: -1px !important;
        }
        
        .leaflet-popup-tip {
          box-shadow: none !important;
          background: white !important;
        }
        
        /* 自定义归属标注样式 */
        .leaflet-control-attribution {
          background-color: rgba(255, 255, 255, 0.8) !important;
          padding: 0 5px !important;
          font-size: 10px !important;
          backdrop-filter: blur(4px) !important;
        }
        
        /* 地图瓦片滤镜效果 */
        .leaflet-tile-container img {
          filter: saturate(0.9) brightness(1.02) !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" className="w-full h-full" />;
};

export default Map;
