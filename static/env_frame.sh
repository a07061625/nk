#!/bin/bash

# 框架公共库node模块目录
DIR_LIB_FRAME_MODULE=${DIR_ROOT}/node_modules/nk-frame
# 项目公共库node模块目录
DIR_LIB_PROJECT_MODULE=${DIR_ROOT}/node_modules/nk-project
# 项目公共库原始目录
DIR_LIB_PROJECT_ORIGIN=${DIR_ROOT}/nk-project
# 进程ID文件后缀
SUFFIX_PID=".pid"
# 日志文件后缀
SUFFIX_LOG=".log"
# js脚本文件后缀
SUFFIX_JS=".js"
# 进程ID
PID=`ps -A -o pid,ppid,cmd|grep node${PROJECT_TAG}|grep -v 'grep'|awk 'BEGIN{pid=0} {pid=$1} END{print pid}'`
# 启动命令
COMMAND_START="start --minUptime 10000 --spinSleepTime 30000 --pidFile ${DIR_LOG}/${PROJECT_TAG}${SUFFIX_PID} -l ${DIR_LOG}/forever_${PROJECT_TAG}${SUFFIX_LOG} -o ${DIR_LOG}/out_${PROJECT_TAG}${SUFFIX_LOG} -e ${DIR_LOG}/error_${PROJECT_TAG}${SUFFIX_LOG} -a -c nodemon ${PROJECT_TAG}${SUFFIX_JS} --exitcrash"
# js检测结果文件
FILE_CHECK_RESULT="rule_check.log"
