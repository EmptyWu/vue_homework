import emitterEvent from '@/libs/emitter';

export default function httpMessageState(response, title = '更新') {
  if (response.data.success) {
    emitterEvent.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    // 錯誤訊息格式
    const message = typeof response.data.message === 'string'
      ? [response.data.message] : response.data.message;
    emitterEvent.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
}
