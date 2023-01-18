package com.example.demo.Service;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Dao.ShowpingDao;
import com.example.demo.Dto.ImageDto;
import com.example.demo.Dto.ItemDto;
import com.example.demo.Dto.OrderDto;
import com.example.demo.Dto.UserDto;

@Service
public class UserService {

	
	@Autowired
	private ShowpingDao showpingDao;
	
	
	//------------------유저정보수정페이지만들기------------------//
	
	
	public UserDto userinfo2(String userid) {
		
		return showpingDao.userinfo2(userid);
	}
	
	public void userupdate(UserDto userDto) {
		
		showpingDao.userupdate(userDto);
	}
	
	
	//---------------주문내역페이지만들기----------------//
	public ArrayList<OrderDto>  orderlist(String userid) {
		
		return showpingDao.orderlist(userid);
	
	}
	
	//-------------회원가입----------------------//
	public void signup(UserDto userDto) {
		
		showpingDao.signup(userDto);
	} 
	public String confirmid(String userid) {
		
		UserDto	userDto = new UserDto();
		userDto = showpingDao.confirmid(userid);
	
		if(StringUtils.isEmpty(userDto)) {
		
					 return "가입가능한id입니다.";
			 
		}else {
			 return "이미 존재하는 id입니다.";
		 }

		 
		 
	}
	//-----------------로그인페이지-------------------------//
	
	public String login(UserDto userDto) {
		
	String userid	=  userDto.getUserid();
	String userpw = 	userDto .getUserpw();
	
	UserDto	dbuserDto  = showpingDao.login(userid);
	System.out.println(userid);
	System.out.println(userpw);
	if(StringUtils.isEmpty(dbuserDto)) {
		
		return "해당되는 아이디가 존재하지않습니다.";
	}else if(!userpw.equals(dbuserDto.getUserpw()) ) {
		
		System.out.println(dbuserDto.getUserpw());
		return "비밀번호가 틀렸습니다";
	}else {
		
		return"로그인에 성공했습니다.";
	}

	}
	
	//------------------상품메인페이지----------------------//
	
	
	public ArrayList<HashMap<String, Object>> itemlist(){
		
		
		return showpingDao.itemlist();
		
	}
	//-----------------------상품상세페이지-------------------//
	
	public HashMap<String, Object> iteminfo2(String itemid){
		
		return  showpingDao.iteminfo2(itemid);
		
		
	}
	
	

	//------------------장바구니페이지만들기-----------------------------//
	public void insertorder(ArrayList<OrderDto> orderlist) {
		
		for(OrderDto orderdto : orderlist) {
			
			showpingDao.insertorder(orderdto);
			
		}
	}
	
	public UserDto userinfo(String userid) {
		
		return showpingDao.userinfo(userid);
			
	}
	
	//---------------상품등록페이지 만들기--------------------//
		
	public void insertitem(ItemDto itemDto,ImageDto imageDto) {
		
		showpingDao.insertitem(itemDto);
		showpingDao.insertimage(imageDto);
		
	}
	
	//-------------------상품수정페이지만들기-------------------//
	
	
	public ItemDto iteminfo(String itemid) {
		
		return showpingDao.iteminfo(itemid);
	}
	
	
	public void updateitem(ItemDto itemDto,ImageDto imageDto) {
		
		showpingDao.updateitem(itemDto);
		showpingDao.updateimage(imageDto);
		
	}
	
	
	
	
	
	
}
