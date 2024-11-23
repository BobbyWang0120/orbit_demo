import React from 'react';

interface MapChatProps {
  locationName: string;
  onClose: () => void;
}

/**
 * 地图聊天框组件
 * @param locationName - 地点名称
 * @param onClose - 关闭聊天框的回调函数
 */
const MapChat: React.FC<MapChatProps> = ({ locationName, onClose }) => {
  return (
    <div className="map-chat-container">
      <div className="map-chat-header">
        <h3>{locationName}</h3>
        <button onClick={onClose} className="close-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="map-chat-content">
        {/* 聊天内容区域 - 暂时为空 */}
      </div>
    </div>
  );
};

export default MapChat;
