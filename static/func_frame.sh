#!/bin/bash

# 生成package.json
function createPackageJson() {
    echo "{" > package.json
    echo "  \"name\": \"${PACKAGE_NAME}\"," >> package.json
    echo "  \"version\": \"${PACKAGE_VERSION}\"," >> package.json
    echo "  \"description\": \"${PACKAGE_DESCRIPTION}\"," >> package.json
    echo "  \"main\": \"${PROJECT_TAG}.js\"," >> package.json
    echo "  \"scripts\": {" >> package.json
    echo "    \"build-product\": \"webpack --config webpack.production.js -p\"," >> package.json
    echo "    \"build-dll\": \"webpack --config webpack.dll.js -p\"," >> package.json
    echo "    \"build-lib\": \"rollup -c\"" >> package.json
    echo "  }," >> package.json
    echo "  \"repository\": {" >> package.json
    echo "    \"type\": \"${PACKAGE_REPOSITORY_TYPE}\"," >> package.json
    echo "    \"url\": \"${PACKAGE_REPOSITORY_URL}\"" >> package.json
    echo "  }," >> package.json
    echo "  \"keywords\": [" >> package.json
    echo "    \"front\"," >> package.json
    echo "    \"ssr\"," >> package.json
    echo "    \"web\"," >> package.json
    echo "    \"framework\"," >> package.json
    echo "    \"node\"," >> package.json
    echo "    \"koa2\"," >> package.json
    echo "    \"nunjucks\"" >> package.json
    echo "  ]," >> package.json
    echo "  \"author\": \"${PACKAGE_AUTHOR}\"," >> package.json
    echo "  \"contact\": \"${PACKAGE_CONTACT}\"," >> package.json
    echo "  \"license\": \"${PACKAGE_LICENSE}\"," >> package.json
    echo "  \"bugs\": {" >> package.json
    echo "    \"url\": \"${PACKAGE_BUGS_URL}\"" >> package.json
    echo "  }," >> package.json
    echo "  \"homepage\": \"${PACKAGE_HOMEPAGE}\"," >> package.json
    echo "  \"os\": [" >> package.json
    echo "    \"linux\"" >> package.json
    echo "  ]," >> package.json
    echo "  \"engines\": {" >> package.json
    echo "    \"node\": \"^10.15.3\"," >> package.json
    echo "    \"nodemon\": \"^1.18.11\"," >> package.json
    echo "    \"forever\": \"^1.0.0\"," >> package.json
    echo "    \"eslint\": \"^5.16.0\"," >> package.json
    echo "    \"webpack\": \"^4.43.0\"," >> package.json
    echo "    \"webpack-cli\": \"^3.3.11\"" >> package.json
    echo "  }," >> package.json
    echo "  \"dependencies\": {" >> package.json
    echo "    \"async\": \"^3.2.0\"" >> package.json
    echo "  }" >> package.json
    echo "}" >> package.json
}

# 刷新模块
function refreshModule() {
    # 框架公共库更新
    if [ ${#DIR_LIB_FRAME_MODULE} -lt 5 ]; then
        echo "frame module dir invalid"
        exit 1
    fi
    if [ ! -d ${DIR_LIB_FRAME_MODULE} ]; then
        if [ -e ${DIR_LIB_FRAME_MODULE} ]; then
            rm -rf ${DIR_LIB_FRAME_MODULE}
        fi
        mkdir ${DIR_LIB_FRAME_MODULE}
    fi
    rm -rf ${DIR_LIB_FRAME_MODULE}/*
    cp -rf ${DIR_LIB_FRAME_ORIGIN}/nk-frame/* ${DIR_LIB_FRAME_MODULE}
    # 项目公共库更新
    if [ ${#DIR_LIB_PROJECT_MODULE} -lt 5 ]; then
        echo "project module dir invalid"
        exit 1
    fi
    if [ ! -d ${DIR_LIB_PROJECT_MODULE} ]; then
        if [ -e ${DIR_LIB_PROJECT_MODULE} ]; then
            rm -rf ${DIR_LIB_PROJECT_MODULE}
        fi
        mkdir ${DIR_LIB_PROJECT_MODULE}
    fi
    rm -rf ${DIR_LIB_PROJECT_MODULE}/*
    cp -rf ${DIR_LIB_PROJECT_ORIGIN}/* ${DIR_LIB_PROJECT_MODULE}
}

# 检测刷新模块
function checkRefreshModule() {
    case $1 in
        0)
            ;;
        1)
            refreshModule
            ;;
        *)
            echo "refresh tag must be 0|1"
            exit 1
            ;;
    esac
}

# js文件格式化
function formatJs() {
    for file in `ls $1`
    do
        fullFile=$1/${file}
        if [ -d $fullFile ]; then
            formatJs ${fullFile}
        elif [ "${fullFile##*.}"x = "js"x ]; then # 多加了x,防止字符串为空时报错
            eslint ${fullFile} --fix >> ${DIR_ROOT}/${FILE_CHECK_RESULT}
        fi
    done
}

# 生成rollup配置文件
function createRollupConfig() {
    if [ -e ${FILE_ROLLUP_CONFIG} ]; then
        return 0
    fi

    echo "import resolve from \"@rollup/plugin-node-resolve\";" > ${FILE_ROLLUP_CONFIG}
    echo "import commonjs from \"@rollup/plugin-commonjs\";" >> ${FILE_ROLLUP_CONFIG}
    echo "import babel from \"@rollup/plugin-babel\";" >> ${FILE_ROLLUP_CONFIG}
    echo "import json from \"@rollup/plugin-json\";" >> ${FILE_ROLLUP_CONFIG}
    echo "" >> ${FILE_ROLLUP_CONFIG}
    echo "export default {" >> ${FILE_ROLLUP_CONFIG}
    echo "    input: [\"./static/project/js/test.js\"], //入口文件路径" >> ${FILE_ROLLUP_CONFIG}
    echo "    output: {" >> ${FILE_ROLLUP_CONFIG}
    echo "        file: \"./dist/bundle.js\", //输出文件路径" >> ${FILE_ROLLUP_CONFIG}
    echo "        format: \"umd\", //输出文件格式" >> ${FILE_ROLLUP_CONFIG}
    echo "        name: \"experience\"," >> ${FILE_ROLLUP_CONFIG}
    echo "        banner: \"\", //文件头部添加的内容" >> ${FILE_ROLLUP_CONFIG}
    echo "        footer: \"\", //文件末尾添加的内容" >> ${FILE_ROLLUP_CONFIG}
    echo "    }," >> ${FILE_ROLLUP_CONFIG}
    echo "    plugins: [resolve(), commonjs(), babel(), json()]," >> ${FILE_ROLLUP_CONFIG}
    echo "    external: [\"the-answer\"]," >> ${FILE_ROLLUP_CONFIG}
    echo "};" >> ${FILE_ROLLUP_CONFIG}
}
