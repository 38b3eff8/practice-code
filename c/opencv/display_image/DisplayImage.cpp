#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;

int main(int argc, char const *argv[]) {
    if (argc != 2) {
        std::cout << "usage: DisplayImage.out <Image_Path>" << std::endl;
    }

    Mat image;
    image = imread(argv[1], CV_LOAD_IMAGE_COLOR);

    if (!image.data) {
        std::cout << "No image data\n" << std::endl;
        return -1;
    }

    namedWindow("Display Image", WINDOW_AUTOSIZE);
    imshow("Display Image", image);

    waitKey(0);

    return 0;
}
