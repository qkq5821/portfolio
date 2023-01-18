import axios from 'axios';
import React, { useState } from 'react';
import { Button, Figure, Form } from 'react-bootstrap';

const ItemSaveForm = (props) => {
  const [uploadFile, setuploadFile] = useState({});
  const [fileImage, setFileImage] = useState('');
  const [Item, setItem] = useState({
    itemname: '',
    itemdetail: '',
    itemprice: '',
  });

  const onchange = (e) => {
    if (e.target.files[0].size > 5 * 1024 * 1024) {
      alert('파일사이즈는 5mb이하만 가능합니다');
    } else {
      setuploadFile(e.target.files[0]);
    }

    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const changeValue = (e) => {
    if (e.target.name === 'itemname' && e.target.value.length === 17) {
      alert('상품명은 17자 이내로 해주세요');
    } else if (e.target.name === 'itemdetail' && e.target.value.length === 25) {
      alert('상품설명은 25자 이내로 해주세요');
    } else if (e.target.name === 'itemprice' && e.target.value.length === 7) {
      alert('가격은 7자 이내로 제한됩니다.');
    } else {
      setItem({
        ...Item,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitItem = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('file', uploadFile);
    formData.append('itemname', Item.itemname);
    formData.append('itemdetail', Item.itemdetail);
    formData.append('itemprice', Item.itemprice);

    axios({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: 'http://portpolio-env.eba-cbjqfceh.ap-northeast-2.elasticbeanstalk.com/iteminsert',
      method: 'POST',
      data: formData,
    }).then(() => {
      props.history.push('/ItemManage');
    });
  };

  return (
    <div className="itemsave_layout">
      <Form onSubmit={submitItem}>
        <Form.Group className="mb-3 ">
          <Form.Label>상품명</Form.Label>
          <Form.Control
            maxLength={17}
            size="lg"
            required={true}
            type="text"
            placeholder="상품명"
            onChange={changeValue}
            name="itemname"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>상품설명</Form.Label>
          <Form.Control
            maxLength={25}
            size="lg"
            required={true}
            type="text"
            placeholder="상품 설명"
            onChange={changeValue}
            name="itemdetail"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>상품가격(숫자만)</Form.Label>
          <Form.Control
            maxLength={7}
            pattern="[0-9]+"
            size="lg"
            required={true}
            type="text"
            placeholder="상품 가격"
            onChange={changeValue}
            name="itemprice"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>상품이미지</Form.Label>
          <Form.Control
            size="lg"
            required={true}
            type="file"
            name="file"
            onChange={onchange}
          />
        </Form.Group>

        <Button type="submit" variant="dark">
          상품등록
        </Button>
      </Form>
      <div className="itemsave_img">
        <Figure>
          <Figure.Image
            width={200}
            height={200}
            alt="미리보기"
            src={fileImage}
          />
        </Figure>
      </div>
    </div>
  );
};

export default ItemSaveForm;
