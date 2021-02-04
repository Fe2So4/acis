import path from 'path'
import { dialog, shell } from 'electron'

export const start = () => {
  const fileName = 'start.bat'
  const filePath =
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '/plugins/DATACOLLECT', fileName)
          : path.join(process.cwd(), '/resources/DATACOLLECT', fileName)
  console.log(filePath)
  shell.openExternal(filePath).then(
    res => {
      console.log('数据采集bat启动成功')
    }
  ).catch(e => {
    dialog.showErrorBox('错误', '未检测到数据采集程序')
  })
}

export const stop = () => {
  // 打印bat
  const fileName = 'stop.bat'
  const filePath =
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '/plugins/DATACOLLECT', fileName)
          : path.join(process.cwd(), '/resources/DATACOLLECT', fileName)
  shell.openExternal(filePath).then(
    res => {
      console.log('数据采集bat关闭成功')
    }
  ).catch(e => {
    dialog.showErrorBox('错误', '未检测到数据采集程序')
  })
}
