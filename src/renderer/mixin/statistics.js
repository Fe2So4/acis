import { findOpeDoc, findAnesDoc, findNurse, findOpeMethod, findDept, findAnesMethod } from '@/api/statistics'
import request from '@/utils/requestForMock.js'
export const opeDoc = {
  data () {
    return {
      opeDocList: []
    }
  },
  mounted () {},
  methods: {
    getOpeDocData (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          request({
            url: findOpeDoc + '/' + query
          }).then(res => {
            this.opeDocList = res.data.data
          })
        }, 200)
      } else {
        this.opeDocList = []
      }
    }
  }
}
export const nurse = {
  data () {
    return {
      nurseList: []
    }
  },

  methods: {
    getNurseData (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          request({
            url: findNurse + '/' + query
          }).then(res => {
            this.nurseList = res.data.data
          })
        }, 200)
      } else {
        this.nurseList = []
      }
    }
  }
}
export const opeMethod = {
  data () {
    return {
      opeMethodList: []
    }
  },

  methods: {
    getOpeMethodData (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          request({
            url: findOpeMethod + '/' + query
          }).then(res => {
            this.opeMethodList = res.data.data
          })
        }, 200)
      } else {
        this.opeMethodList = []
      }
    }
  }
}
export const anesDoc = {
  data () {
    return {
      anesDocList: []
    }
  },

  methods: {
    getAnesDocData (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          request({
            url: findAnesDoc + '/' + query
          }).then(res => {
            this.anesDocList = res.data.data
          })
        }, 200)
      } else {
        this.anesDocList = []
      }
    }
  }
}
export const dept = {
  data () {
    return {
      deptList: []
    }
  },

  methods: {
    getDeptData (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          request({
            url: findDept + '/' + query
          }).then(res => {
            this.deptList = res.data.data
          })
        }, 200)
      } else {
        this.deptList = []
      }
    }
  }
}
export const anesMethod = {
  data () {
    return {
      anesMethodList: []
    }
  },
  methods: {
    getAnesMethodData (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          request({
            url: findAnesMethod + '/' + query
          }).then(res => {
            this.anesMethodList = res.data.data
          })
        }, 200)
      } else {
        this.anesMethodList = []
      }
    }
  }
}
