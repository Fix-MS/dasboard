export const fetchData = (url: string, parseData: (data: any) => void) => {
  fetch(url)
      .then((res) => {
        if (res.ok) {
          const contentType = res.headers.get('content-type');
          switch (contentType) {
            case 'application/json; charset=UTF-8':
              return res.json();
            case 'text/plain;charset=UTF-8':
              return res.text();
          }
        }
      })
      .then((data) => {
        let result;
        try {
          if (typeof data === 'string') {
            result = JSON.parse(data);
          } else {
            result = data;
          }
        } catch (e) {
          console.warn(e);
        }
        if (parseData) {
          parseData(result);
        }
      });
};
