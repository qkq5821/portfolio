package com.example.demo.Controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Dto.ImageDto;
import com.example.demo.Dto.ItemDto;
import com.example.demo.Dto.OrderDto;
import com.example.demo.Dto.UserDto;
import com.example.demo.Service.UserService;
import com.example.demo.uploader.S3Service;


import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
public class Controller {

	@Autowired
	private UserService showpingService;
    
	@Autowired
	private S3Service s3Service;
	//---------------유저정보수정페이지------------------//
	
	@GetMapping("/userinfo2/{userid}")
	public UserDto userinfo2(@PathVariable String userid) {
		
		return showpingService.userinfo2(userid);
		
	}
	
	@PutMapping("/userupdate")
	public void userupdate(@RequestBody UserDto userDto) {
		
		showpingService.userupdate(userDto);
	}
	

	//----------------주문내역페이지-------------------//
	@GetMapping("/orderlist/{userid}")
	public ArrayList<OrderDto>  OrderList(@PathVariable String userid) {
		
		return  showpingService.orderlist(userid);
		
	}
	//--------------------회원가입---------------------//
	
	@PostMapping("/signup")
	public void signup(@RequestBody UserDto userDto) {
		
		showpingService.signup(userDto);
		
	}
	
	@GetMapping("/confirmid/{userid}")
	public String comfirmid(@PathVariable String userid) {
		
		return showpingService.confirmid(userid);
	
		
	}
	
	//-----------------------로그인페이지-----------------------//
	
	@PostMapping("/login")
	public String login(@RequestBody UserDto userDto) {
		return showpingService.login(userDto);
		
	}
	
	//-------------------------상품메인페이지--------------------//
	
	@GetMapping("/itemlist")
	public ArrayList<HashMap<String, Object>> itemlist(){
		
		
		return showpingService.itemlist();
	}
	//---------------------상품상세페이지-------------------------//
	
	@GetMapping("/iteminfo2/{itemid}")
	public HashMap<String, Object> iteminfo2(@PathVariable String itemid){
		
		return showpingService.iteminfo2(itemid);
	};
	
	

	//------------------장바구니 페이지------------------------------//

	@PostMapping("/insertorder")
	public void insertorder(@RequestBody ArrayList<OrderDto> orderDto) {
		
		showpingService.insertorder(orderDto);
		
	}
	
	@GetMapping("/userinfo/{userid}")
	public UserDto userinfo(@PathVariable String userid ) {
		
		return showpingService.userinfo(userid);
	}
	
	//----------------상품등록페이지 ---------------//
	
	@PostMapping("/iteminsert")
	public void imageinsert(MultipartFile file, ItemDto itemDto) throws IllegalStateException, IOException {
		
		UUID uuid = UUID.randomUUID();
		String fileName = uuid +"_"+file.getOriginalFilename();

		
		ImageDto imageDto = new ImageDto();
		
		String url = s3Service.upload(file,fileName);
		imageDto.setFilename(fileName);
		imageDto.setFilepath(url);
		
		showpingService.insertitem(itemDto,imageDto);
		
	}
	
	
	//-----------------------상품수정페이지---------------------------------//
	
	@PutMapping("/itemupdate")
	public void imageupdate(MultipartFile file, ItemDto itemDto) throws IllegalStateException, IOException {
	
	
		UUID uuid = UUID.randomUUID();
		String fileName = uuid +"_"+file.getOriginalFilename();
		
		
		ImageDto imageDto = new ImageDto();
		
		imageDto.setItemid(itemDto.getItemid());
		String url =s3Service.upload(file,fileName);
		imageDto.setFilename(fileName);
		imageDto.setFilepath(url);

		showpingService.updateitem(itemDto, imageDto);
		
	}
	
	
	
	
	@GetMapping("/iteminfo/{itemid}")
	public ItemDto iteminfo(@PathVariable String itemid) {
		
		
		return showpingService.iteminfo(itemid);
	
		
	
	}
	
	
	
	
	
	
	
	
	
	
	
}
